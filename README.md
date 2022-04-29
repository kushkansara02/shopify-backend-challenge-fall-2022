# Fall 2022 Shopify Backend Developer Challenge

The additional feature chosen was "when deleting, allow deletion comments and undeletion".

NOTE: In this repository, the database connection URLs are hardcoded. I would not do this in a production environment. This is to allow easier evaluation, and to be able to easily run the code from Replit. Replit doesn't support .env files, but in a production environment, these values would likely be stored as environment variables instead.

# Setup

## Local

1. `git clone` this repository
2. Make sure `npm` is installed in your machine.
3. Run `npm install` to install dependencies required for the application.
4. Run `export proto=http` in shell.
5. Run `npm run start` to start the application
6. After running `npm run start`, you will see console output along the lines of `Application is running on: http://[hostname]:port`. Open that URL in your browser to access the web app.

## Replit

1. Run `npm install` to install dependencies required for the application.
2. Run `export proto=https` in shell.
3. Run `npm run start` to start the application
4. After running `npm run start`, replit will automatically open a window with the web application running.

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
- The count of an inventory item cannot be less than 0, so a negative input will always be changed to 0.
- The price of an inventory item cannot be less than 0, so a negative input will always be changed to 0.
- The name of each inventory item must be unique. If a new item is created with a name that already exists, nothing will be created.

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
