# paas-datastore-api
Sign-Off Task for SSE Module, Portsmouth University

## Overview
- A service (API) for Google App Engine which stores values in named registars using Google Cloud Datastore.

# API usage
| Path | Method | Paramaters | Content Body | Description | Responces | Response body |
| ---- | ------ | ---------- | ------------ | ----------- | --------- | ------------- |
| / | GET | /{id} | None | reads the value of a named register | 200 - text/plain, 500 - Internal Error | text/plain |
| / | PUT | /{id} | text/plain | sets a named register to a given number | 20s0 - text/plain, 500 - Internal Error | text/plain |
| / | POST | /{id} | text/plain | adds a number to a named register | 200 - text/plain, 500 - Internal Error | text/plain |
| / | DELETE | /{id} | None | drops a named register | 204 - Success, No Content, 500 - Internal Errors | None |
