Work in progress. Name spaced under `/api/`.

### Account

`GET /account` to fetch current account info

    {
        "email": "foo@bar.net",
        "firstName": "Foo",
        "id": "ef8d2ff6-63ad-4d1a-8a20-61eb065a2562",
        "lastName": "Bar",
        "organization_id": "1236c86b-2330-47ff-8697-abdf89a48a9d",
        "outOfTown": false,
        "phoneNumbers": ["+13331234567"]
    }

`PATCH /account` to update current account info

### Incidents

`GET /incidents` to fetch current incidents

`POST /incidents` to create a new incident

`GET /incidents/{id}` to fetch an incident by id

    {
        "date": Tue Nov 26 2013 04:57:21 GMT+00:00,
        "id": "d58acad6-c847-4438-a0bf-417724f5bcfb",
        "name": "Some Incident",
        "organization_id": "1236c86b-2330-47ff-8697-abdf89a48a9d"
    }

`PATCH /incidents/{id}` to update an incident

`DELETE /incidents/{id}` to delete an incident

#### Responses

`GET /incidents/{id}/responses`
