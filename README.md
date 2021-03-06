# Fall 2022 Shopify Backend Developer Challenge

The additional feature chosen was "when deleting, allow deletion comments and undeletion".

NOTE: In this repository, the database connection URLs are hardcoded. I would not do this in a production environment. This is to allow easier evaluation, and to be able to easily run the code from Replit. Replit doesn't support .env files, but in a production environment, these values would likely be stored as environment variables instead.

# Running the App

Note: the commands below must be run in a bash terminal.

## Local

1. `git clone` this repository
2. Make sure `npm` is installed in your machine.
3. Run `npm install` in the project root directory to install dependencies required for the application.
4. Run `npm run start:local` in the project root directory to start the application
5. After running `npm run start:local`, you will see console output along the lines of `Application is running on: http://[hostname]:port`. Open that URL in your browser to access the web app.

## Replit

1. Click on the `Run` button at the top of the screen.
2. Replit will automatically open a window with the web application running.

# Usage

Once you are in the web application, you will see three options in the top navbar.

## Inventory Storage (Top Left, on Navbar)

This is `/inventory`, and the default page. Here, you can view a list of the inventory items. Clicking on the name of an inventory item will lead you to `/inventory/:id`, where you can view the info for that item. Additionally, you can click on the update or delete buttons to perform the respective actions. While deleting, you will see a field for `Deletion Comment`, which you can fill in.

## Archived Items (Top Middle, on Navbar)

This is `/archived-inventory`. Here, you will be able to view a list of the deleted inventory items, along with their deletion comments. You will have the option of undeleting the items you want.

## Add New (Top Left, on Navbar)

This will cause a popup to come on the screen, where you can add a new inventory item.

# My Implementation

I used the NestJS framework along with TypeScript to implement the MVC (Model-View-Controller) architecture. Additionally, I used Prisma as an ORM along with a PostgreSQL database hosted on Heroku. With these technologies, the backend code and database queries are type-safe and all data is validated. Below are some other things to keep in mind:

- Take a look at `prisma/schema.prisma` to understand the database schemas.
- I have prepopulated the database with some sample data.
- The count of an inventory item cannot be less than 0, so a negative input will always be changed to 0.
- The price of an inventory item cannot be less than 0, so a negative input will always be changed to 0.
- The name of each inventory item must be unique. If a new item is created with a name that already exists, nothing will be created.
  - Let's say we have an existing inventory item called `Books`. If there's also an archived inventory item called `Books` and we try to undelete it, then:
    1. The item in the existing inventory will be unchanged.
    2. The item in the archived inventory will be deleted.
  - The above is also true vice versa - when deleting an existing item with the same name as an archived inventory item.

## Undeletion

In my approach, there are two separate tables in the database: `Inventory` and `ArchivedInventory`. Whenever an inventory item in `Inventory` is deleted, it is moved to the `ArchivedInventory` table along with a deletion comment. When/if the item is undeleted, it is simply moved back. This way, querying for deleted and existing items is quick, since there are two separate tables. (i.e. we don't have to go through all of the deleted items if we want to get all the existing items)

# API Endpoints Documentation

The API accepts data in the JSON format. Thus, the `Content-Type` header in each request must be set to `application/json`.

| Endpoint                  | GET                                         | POST                      | PUT                              | DELETE                                                                                |
| ------------------------- | ------------------------------------------- | ------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| `/inventory`              | Get all existing inventory items            | Create an inventory item. | -                                | -                                                                                     |
| `/inventory/:id`          | Get a specific inventory item               | -                         | Update a specific inventory item | Delete a specific inventory item                                                      |
| `/archived-inventory`     | Get all deleted inventory items             | -                         | -                                | -                                                                                     |
| `/archived-inventory/:id` | Get the details of a deleted inventory item | -                         | -                                | 'Undelete' a specific deleted inventory item - it will be added back to the inventory |
