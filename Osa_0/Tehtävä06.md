sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser 201 created

    note right of browser: with the JavaScript code already sent to the browser the browser updates its notes and then sends the updated notes to the server