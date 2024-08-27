## Decisions

### 1. Document decisions

Every major decision made on this project (technical or not) should be documented on this file.

### 2. Minimum dependencies

Every dependency added to the project needs a very good justification. For example: To do work that is necessary but would take a lot of time/work to implement ourselves.

### 3. File structure

In order to avoid creeping coupling and complexity we will isolate external dependencies in dedicated modules. To accomplish that,the `/src` folder will abide by the following structure:

```
├── public
└── src
    ├── core
    │   ├── auth
    │   ├── pacient
    │   └── appointment
    ├── shared
    │   └── components
    └── infra
        ├── database
        │   ├── driver
        │   └── repository
        ├── logging
        ├── http
        ├── renderer
        └── config
````

In this structure, the `infra` folder will hold modules that make sense by themselves, like a database driver, logging module or jsx renderer. We should be able to just copy them, paste on a different project and they will still work and make sense. For this kind of goal, they should only be allowed to import other files from inside the module (except the logger) and external libraries.

The `shared` folder will hold modules that are specific to this project but are shared accross many core modules, like some components and zod schemas. For this purpose, they are allowed to import other files inside the module and `infra` modules, but not `core` modules.

The `core` folder will use the `shared` and `infra` modules to implement features and should be focused on business logic instead of internals (like http or db handling)

### 4. No ORM

Our current needs for interacting with the database are very simple. We only need to make simple queries to a single database instance. Therefore, we will not adopt any ORM yet and instead rely on raw SQL queries. 

These queries will be abstracted using the `Repository` pattern, which should also make it easier to introduce an ORM later if we so decide.

### 5. No client-side framework

Similar to the database, our front-end needs are currently very simple. We only plan to have static lists of elements (pacients, appointments, insurances, etc.) and forms to manupulate such data. Therefore, in order to keep the project as simple as possible, we have chosen to opt-out of any client-side frameworks for now.

We will use React on the server-side purely as a template engine. This should allow us to use JSX/TSX and facilitate componentization but does not have any impact on the client-side

### 6. Dependency injection

Inject all dependencies and wire them together on the src/index.ts. This helps us unit test, enforce separation of concerns and allows us to easily control the dependency flow

### 7. HTML Streaming

In order to reduce the TTFB (Time To First Byte) and improve the user experience I believe it is worth it to try HTML Streaming. That means sendind a HTML shell quickly and later filling it with data. For example, a pacient list page could quickly return the shell of the page (in this case: CSS, menu and search bar) and then place the actual pacient list once it is ready (takes longer since it requires a query to the DB)

Apparently, the streaming part is easiest since Node already supports it and all browsers as well but it works in a way that new chunks of HTML are appended to the current page. In order to replace an arbitrary part of the page when new chunks arrive, we could:
 - Send a inline <script> tag, that will replace de desired content through JavaScript
 - Leverage Declarative Shadow DOM to specify slots where data is supposed to go and later map the data to each slot. Just be carefull because declarative shadow dom is not fully supported by all browsers yet


refs:
- https://geekpaul.medium.com/lets-build-a-react-from-scratch-part-3-react-suspense-and-concurrent-mode-5da8c12aed3f
- https://nodejs.org/api/stream.html#stream_readable_streams
- https://nodesource.com/blog/understanding-streams-in-nodejs/
- https://medium.com/the-thinkmill/progressive-rendering-the-key-to-faster-web-ebfbbece41a4
- https://lamplightdev.com/blog/2024/01/10/streaming-html-out-of-order-without-javascript/?ck_subscriber_id=2246502080