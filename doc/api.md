# Grand Register API

## Common

### Supported data types

This API enables users to create custom registers with columns containing data of various types. The types currently
supported are:

#### String

These columns are expected to contain relatively short texts of arbitrary format. They will be displayed as a single-line
text field.

No validation will be performed on the values in these columns.

#### Text

These columns are expected to contain longer texts of arbitrary format. They will be displayed as a multi-line text
field.

No validation will be performed on the values in these columns.

#### Number

These columns are expected to contain numbers. They will be displayed as a single-line text field.

The values entered in these columns will be validated for being proper numbers.

#### Date

These columns are expected to contain a date. They will be displayed as a text field with a date-picker widget attached
to it.

The values entered in these columns will be validated for being proper dates as specified in ISO 8601, e.g.
`2018-01-21`.

#### DateTime

These columns are expected to contain an exact date and time. They will be displayed as a text field with a date-and-time
picker widget attached to it.

The values entered in these columns will be validated for being proper UTC datetimes as specified in ISO 8601, e.g.
`2018-01-21T15:10:49Z`.

#### Geolocation

These columns are expected to contain longitude and latitude coordinates.

The values entered in these columns will be validated for being proper coordinates.

#### EGN

The unique identifier assigned to every Bulgarian citizen, the EGN is a string of 10 numbers containing the birth date
of the person it is assigned to, as well as a checksum verifying its validity. These columns are expected to contain
such strings. They will be displayed as a single-line text field.

The values entered in these columns will be validated for being a valid EGN. This will include validating its size, its
date components (month and day numbers), and its checksum.

### Responses

Only the bodies of HTTP Responses are documented here. The documented bodies assume that the request has succeeded and
thus the leading `200 OK` line is omitted for brevity. If a request fails, its body will contain a JSON object with an
`error` property containing machine-readable error string, and possibly an `error-details` property containing human-
readable description of the error. For example, an attempt by an unauthorized user to create a new register may result
in the following response body:

    {
      "error": "unauthorized",
      "error-details": "You don't have permission to create a new register"
    }

If a response has no body, it will be described as 'None' in this document.

## Registers

### List registers

 * Request

        GET /registers

 * Response

        [
          {
            "id": "cref42",
            "name": "Заклети преводачи",
            "status": "active"
          }
        ]

 * Authorization level
   - Everyone

 * Details
   - The `status` property can have one of the following values: **active**, **closed**

### Create new register

 * Request

        POST /registers

        {
          "name": "Заклети преводачи",
          "schema": [
            {
              "id": "EGN",
              "title": "ЕГН",
              "type": "EGN",
              "primary-id": true
            },
            {
              "id": "Ime",
              "title": "Име",
              "type": "text"
            },
            {
              "id": "Prezime",
              "title": "Презиме",
              "type": "text"
            },
            {
              "id": "Familiq",
              "title": "Фамилия",
              "type": "text"
            },
            {
              "id": "Adres_na_praktikata",
              "title": "Адрес на практиката",
              "type": "text"
            },
            {
              "id": "Validno_do",
              "title": "Валидно до",
              "type": "date"
            }
          ],
          "authorized-users": [
            {
              "name": "Митьо Митьов",
              "public-key": "BnrzD7/SpIs+QUBC+uU4...",
              "role": "tenant-admin"
            },
            {
              "name": "Пешо Пашов",
              "public-key": "tbsjKpZ/YaTebrc/xHJUs...",
              "role": "tenant-user"
            }
          ]
        }

 * Response

        {
          "created-register-id": "cref42"
        }

 * Authorization level
   - Global administrators

 * Details
   - Users must specify one of the fields as a `primary-id`. The value in this field will be used to distinguish changes
     that refer to the same record.
   - See section #supported-data-types for information about the supported types in the schema.
   - The `role` property in `authorized-users` can have one of the following values: **tenant-admin**, **tenant-user**.
     Both types of users can read and insert records in the register. Only "tenant-admin" users can add/remove authorized
     users for this register.

### Close a register

 * Request

        DELETE /registers/:id

 * Response

None

 * Authorization level
   - Global administrators

 * Details
   - This request doesn't delete the register's history. The register is only closed for new records, but it's existing
     records and history can still be retrieved by this API.

### Get register schema

 * Request

        GET /registers/:id/schema

 * Response

        [
          {
            "id": "EGN",
            "title": "ЕГН",
            "type": "EGN",
            "primary-id": true
          },
          {
            "id": "Ime",
            "title": "Име",
            "type": "text"
          },
          {
            "id": "Prezime",
            "title": "Презиме",
            "type": "text"
          },
          {
            "id": "Familiq",
            "title": "Фамилия",
            "type": "text"
          },
          {
            "id": "Adres_na_praktikata",
            "title": "Адрес на практиката",
            "type": "text"
          },
          {
            "id": "Validno_do",
            "title": "Валидно до",
            "type": "date"
          }
        ]

 * Authorization level
   - Everyone

### List all records in register

 * Request

        GET /registers/:id/records

 * Response

        [
          {
            "primary-id": "2701023456",
            "fields": [
              {
                "id": "EGN",
                "title": "ЕГН",
                "value": "2701023456"
              },
              {
                "id": "Ime",
                "title": "Име",
                "type": "Гошо"
              },
              {
                "id": "Prezime",
                "title": "Презиме",
                "type": "Гошов"
              },
              {
                "id": "Familiq",
                "title": "Фамилия",
                "type": "Гогошов"
              },
              {
                "id": "Adres_na_praktikata",
                "title": "Адрес на практиката",
                "type": "У Гошо"
              },
              {
                "id": "Validno_do",
                "title": "Валидно до",
                "type": "2038-01-20"
              }
            ],
            "status": "active",
            "last-modified": "2018-01-20T13:12:06Z"
          }
        ]

 * Authorization level
   - Everyone

 * Details
   - The `primary-id` property has the same value as the field that has been specified by the user as primary during
     register creation.
   - The `status` property can have one of the following values: **active**, **deleted**.

### List some records from register based on a custom filter

 * Request

        PUT /registers/:id/records/filter

        {
          "primary-id": "2701023456",
          "status": "active",
          "modified-before": "2018-01-20T14:12:06Z",
          "modified-after": "2018-01-20T12:12:06Z",
          "fields": [
            {
              "id": "Familiq",
              "value": "Гогошов"
            },
            {
              "id": "Adres_na_praktikata",
              "value": "У Гошо"
            }
          ]
        }

 * Response

        [
          {
            "primary-id": "2701023456",
            "fields": [
              {
                "id": "EGN",
                "title": "ЕГН",
                "value": "2701023456"
              },
              {
                "id": "Ime",
                "title": "Име",
                "type": "Гошо"
              },
              {
                "id": "Prezime",
                "title": "Презиме",
                "type": "Гошов"
              },
              {
                "id": "Familiq",
                "title": "Фамилия",
                "type": "Гогошов"
              },
              {
                "id": "Adres_na_praktikata",
                "title": "Адрес на практиката",
                "type": "У Гошо"
              },
              {
                "id": "Validno_do",
                "title": "Валидно до",
                "type": "2038-01-20"
              }
            ],
            "status": "active",
            "last-modified": "2018-01-20T13:12:06Z"
          }
        ]

 * Authorization level
   - Everyone

 * Details
   - All properties in the request body are optional. If the body is an empty object, all records will be returned (as
     if `GET /registers/:id/records` was sent instead). Every property added to the body limits the set of returned
     records by rejecting records which do not meet that specific criterion. Accepted filter properties are:
     - `primary-id`: Can be a single value or an array of acceptable values, e.g. `"2701023456"` or `["2701023456", "2710207890"]`.
     - `status`: Can be a single value or an array of acceptable values, e.g. `"active"` or `["active", "deleted"]`.
     - `modified-before`: Only records whose `last-modified` time is earlier than the one specified here will be returned.
     - `modified-after`: Only records whose `last-modified` time is later than the one specified here will be returned.
     - `fields`: An array of id/value pairs. Only records whose field with the specified id contains the specified value
                 will be returned in the response.

### Insert new record in register

 * Request

        POST /registers/:id/records

        {
          "fields": [
            {
              "id": "EGN",
              "value": "2701023456"
            },
            {
              "id": "Ime",
              "type": "Гошо"
            },
            {
              "id": "Prezime",
              "type": "Гошов"
            },
            {
              "id": "Familiq",
              "type": "Гогошов"
            },
            {
              "id": "Adres_na_praktikata",
              "type": "У Гошо"
            },
            {
              "id": "Validno_do",
              "type": "2038-01-20"
            }
          ],
          "status": "active"
        }

 * Response

None

 * Authorization level
   - Tenant administrators

 * Details
   - See #list-records-in-register for information about the `status` property.

### Get a list of all changes for a record

 * Request

        PUT /registers/:id/records/changes

        {
          "primary-id": "2701023456"
        }

 * Response

        [
          {
            "primary-id": "2701023456",
            "fields": [
              {
                "id": "EGN",
                "title": "ЕГН",
                "value": "2701023456"
              },
              {
                "id": "Ime",
                "title": "Име",
                "type": "Гошо"
              },
              {
                "id": "Prezime",
                "title": "Презиме",
                "type": "Гошов"
              },
              {
                "id": "Familiq",
                "title": "Фамилия",
                "type": "Гогошов"
              },
              {
                "id": "Adres_na_praktikata",
                "title": "Адрес на практиката",
                "type": "У Бате"
              },
              {
                "id": "Validno_do",
                "title": "Валидно до",
                "type": "2036-11-03"
              }
            ],
            "status": "active",
            "modification-time": "2016-11-03T15:42:28Z"
          },
          {
            "primary-id": "2701023456",
            "fields": [
              {
                "id": "EGN",
                "title": "ЕГН",
                "value": "2701023456"
              },
              {
                "id": "Ime",
                "title": "Име",
                "type": "Гошо"
              },
              {
                "id": "Prezime",
                "title": "Презиме",
                "type": "Гошов"
              },
              {
                "id": "Familiq",
                "title": "Фамилия",
                "type": "Гогошов"
              },
              {
                "id": "Adres_na_praktikata",
                "title": "Адрес на практиката",
                "type": "У Гошо"
              },
              {
                "id": "Validno_do",
                "title": "Валидно до",
                "type": "2038-01-20"
              }
            ],
            "status": "active",
            "modification-time": "2018-01-20T13:12:06Z"
          }
        ]

 * Authorization level
   - Everyone

### Get the state of a record at a specified time

The state of a record at any given point of time is actually described by the last change made to this record before
that time. That's why it is obtained as a change object instead of a record object via a changes-specific request.

 * Request

        PUT /registers/:id/records/changes

        {
          "primary-id": "2701023456",
          "valid-at": "2017-04-18T02:00:00Z"
        }

 * Response

        [
          {
            "primary-id": "2701023456",
            "fields": [
              {
                "id": "EGN",
                "title": "ЕГН",
                "value": "2701023456"
              },
              {
                "id": "Ime",
                "title": "Име",
                "type": "Гошо"
              },
              {
                "id": "Prezime",
                "title": "Презиме",
                "type": "Гошов"
              },
              {
                "id": "Familiq",
                "title": "Фамилия",
                "type": "Гогошов"
              },
              {
                "id": "Adres_na_praktikata",
                "title": "Адрес на практиката",
                "type": "У Бате"
              },
              {
                "id": "Validno_do",
                "title": "Валидно до",
                "type": "2036-11-03"
              }
            ],
            "status": "active",
            "modification-time": "2016-11-03T15:42:28Z"
          }
        ]

 * Authorization level
   - Everyone

 * Details
   - There are only two possibilities for the number of objects in the returned array:
     - The array contains a single change object. This means that the record already existed at the specified time; the
       single change object describes the state of the record at that time.
     - The array is empty. This means that the record did not exist at all at the specified time.

## Users

### Get the list of global administrators

 * Request

        GET /users

 * Response

        [
          {
            "name": "Тошо Тошев",
            "public-key": "b0aiSjwU5dJdoT/XR5...",
            "role": "global-admin"
          }
        ]

 * Authorization level
   - Global administrators

### Add a new user to the global administrators list

 * Request

        POST /users

        {
          "name": "Тошо Тошев",
          "public-key": "b0aiSjwU5dJdoT/XR5...",
          "role": "global-admin"
        }

 * Response

None

 * Authorization level
   - Global administrators

### Remove a user from the global administrators list

 * Request

        DELETE /users

        {
          "public-key": "b0aiSjwU5dJdoT/XR5..."
        }

 * Response

None

 * Authorization level
   - Global administrators

### Get the authorized users for a register

 * Request

        GET /registers/:id/users

 * Response

        [
          {
            "name": "Митьо Митьов",
            "public-key": "BnrzD7/SpIs+QUBC+uU4...",
            "role": "tenant-admin"
          },
          {
            "name": "Пешо Пашов",
            "public-key": "tbsjKpZ/YaTebrc/xHJUs...",
            "role": "tenant-user"
          }
        ]

 * Authorization level
   - Tenant administrators

### Add new authorized user for a register

 * Request

        POST /registers/:id/users

        {
          "name": "Пешо Пашов",
          "public-key": "tbsjKpZ/YaTebrc/xHJUs...",
          "role": "tenant-user"
        }

 * Response

None

 * Authorization level
   - Tenant administrators

 * Details
   - See #create-new-register for information about the `role` property.

### Remove user from authorized users for registers

 * Request

        DELETE /registers/:id/users

 * Response

        {
          "public-key": "tbsjKpZ/YaTebrc/xHJUs..."
        }

 * Authorization level
   - Tenant administrators
