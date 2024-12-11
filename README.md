# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here:

Delpiu's shared repository: https://github.com/delpiulopez/A2-Delpiu-22081430.git

## Tasks and Documentation

### Task 1: USER INTERFACE CHANGES

#### Change Button Label from Contact Component

_Screenshot:_
![UI Changes](screenshots/task1_1.png)

#### Change Button Label in Phone Component

_Screenshot:_
![UI Changes](screenshots/task1_2.png)

#### Change the Placeholder Text "Name" with Input Type Text into a Drop-down Menu with 4 Categories

_Screenshot:_
![UI Changes](screenshots/task1_3.png)

#### Change the Label "Name" to "Phone Type" 

_Screenshot:_
![UI Changes](screenshots/task1_4.png)

---

### Task 2: API OPERATIONS

#### Show Contact
```bash
curl -X GET http://localhost/api/contacts
```
_Screenshot:_
![Show Contact Output](screenshots/show_contact.png)

#### Add Contact
```bash
curl -X POST http://localhost/api/contacts -H "Content-Type: application/json" -d "{\"name\": \"Test Contact\", \"address\": \"123 Test St\"}"
```
_Screenshot:_
![Add Contact Output](screenshots/add_contact.png)

#### Delete Contact
```bash
curl -X DELETE http://localhost/api/contacts/1
```
_Screenshot:_
![Delete Contact Output](screenshots/delete_contact.png)

#### Update Contact
```bash
curl -X PUT http://localhost/api/contacts/1 -H "Content-Type: application/json" -d "{\"name\": \"Updated Contact\", \"address\": \"456 Updated Ave\"}"
```
_Screenshot:_
![Update Contact Output](screenshots/update_contact.png)

#### Show Phone
```bash
curl -X GET http://localhost/api/phones
```
_Screenshot:_
![Show Phone Output](screenshots/show_phone.png)

#### Add Phone
```bash
curl -X POST http://localhost/api/phones -H "Content-Type: application/json" -d "{\"number\": \"1234567890\", \"type\": \"mobile\", \"contact_id\": 1}"
```
_Screenshot:_
![Add Phone Output](screenshots/add_phone.png)

#### Delete Phone
```bash
curl -X DELETE http://localhost/api/phones/1
```
_Screenshot:_
![Delete Phone Output](screenshots/delete_phone.png)

#### Update Phone
```bash
curl -X PUT http://localhost/api/phones/1 -H "Content-Type: application/json" -d "{\"number\": \"0987654321\", \"type\": \"home\"}"
```
_Screenshot:_
![Update Phone Output](screenshots/update_phone.png)

---

### Task 3: DATABASE MODELLING WITH SEQUELIZE AND TEST THE API COMMANDS WHEN THE DATABASE MODIFICATION DONE

#### Table `contacts`
Added columns and updated constraints to better support relations.

_Screenshot:_
![Contacts Table Schema](screenshots/contacts_table_schema.png)

#### Table `phones`
Modified schema to include foreign key linking phones to contacts.

_Screenshot:_
![Phones Table Schema](screenshots/phones_table_schema.png)

#### Frontend Output
_Screenshot:_
![Frontend Output](screenshots/frontend_output.png)

#### Test the 8 APIs After Modifications

1. **Show Contact:**
   ```bash
   curl -X GET http://localhost/api/contacts
   ```
   _Screenshot:_
   ![Show Contact API Test](screenshots/modified_show_contact.png)

2. **Add Contact:**
   ```bash
   curl -X POST http://localhost/api/contacts -H "Content-Type: application/json" -d "{\"name\": \"Test Contact\", \"address\": \"123 Test St\"}"
   ```
   _Screenshot:_
   ![Add Contact API Test](screenshots/modified_add_contact.png)

3. **Update Contact:**
   ```bash
   curl -X PUT http://localhost/api/contacts/1 -H "Content-Type: application/json" -d "{\"name\": \"Updated Contact\", \"address\": \"456 Updated Ave\"}"
   ```
   _Screenshot:_
   ![Update Contact API Test](screenshots/modified_update_contact.png)

4. **Delete Contact:**
   ```bash
   curl -X DELETE http://localhost/api/contacts/1
   ```
   _Screenshot:_
   ![Delete Contact API Test](screenshots/modified_delete_contact.png)

5. **Show Phone:**
   ```bash
   curl -X GET http://localhost/api/phones
   ```
   _Screenshot:_
   ![Show Phone API Test](screenshots/modified_show_phone.png)

6. **Add Phone:**
   ```bash
   curl -X POST http://localhost/api/phones -H "Content-Type: application/json" -d "{\"number\": \"1234567890\", \"type\": \"mobile\", \"contact_id\": 1}"
   ```
   _Screenshot:_
   ![Add Phone API Test](screenshots/modified_add_phone.png)

7. **Update Phone:**
   ```bash
   curl -X PUT http://localhost/api/phones/1 -H "Content-Type: application/json" -d "{\"number\": \"0987654321\", \"type\": \"home\"}"
   ```
   _Screenshot:_
   ![Update Phone API Test](screenshots/modified_update_phone.png)

8. **Delete Phone:**
   ```bash
   curl -X DELETE http://localhost/api/phones/1
   ```
   _Screenshot:_
   ![Delete Phone API Test](screenshots/modified_delete_phone.png)

---

### Task 4: EXPANDING THE EXISTING TABLES (E.G. COMPANY)

#### Companies table

_Screenshot:_
![Companies Table Structure](screenshots/companies_table.png)

#### Add Company
```bash
curl -X POST http://localhost/api/companies -H "Content-Type: application/json" -d "{\"company_name\": \"Ador\", \"company_address\": \"Incheon 2\", \"contact_id\": 37}"
```
_Screenshot:_
![Add Company Output](screenshots/add_company.png)

#### Show Company
```bash
curl http://localhost/api/companies/37
```
_Screenshot:_
![Show Company Output](screenshots/show_company.png)

#### Update Company
```bash
curl -X PUT http://localhost/api/companies/1/contacts/37 -H "Content-Type: application/json" -d "{\"company_name\": \"Nwjns Inc\", \"company_address\": \"Tamsur\"}"
```
_Screenshot:_
![Update Company Output](screenshots/update_company.png)

#### Delete Company
```bash
curl -X DELETE http://localhost/api/companies/1/contacts/37
```
_Screenshot:_
![Delete Company Output](screenshots/delete_company.png)

---

### Task 5: FRONTEND

#### Overview of New Files
I created 3 new files – “NewCompany.js, Company.js, and CompanyList.js”. Each of the files has their own purposes, but collectively, the addition of the 3 new files provide a complete CRUD interface to manage companies tied to a specific contact.

1. **NewCompany.js**: defines the NewCompany component which provides a form for users to input a new company name and company address and sends a request to create a new company associated with a contact.

_Screenshot:_
![New Company Files](screenshots/new_company.png)

2. **CompanyList.js**: defines the CompanyList component that manages the list of companies associated with a contact. It displays companies in a table form integrating the Company component for each row and includes the NewCompany components to add new company entries.

_Screenshot:_
![New Company Files](screenshots/company_list.png)

3. **Company.js**: defines the Company component, representing a single company in a table row. It has functionality to let users delete or edit the company entries they have made previously.

_Screenshot:_
![New Company Files](screenshots/company.png)

#### Integration
The new components were integrated into `Contact.js` to support CRUD operations for companies. A `useEffect` hook fetches company data dynamically and updates the `companies` state.

_Screenshot:_
![New Company Files](screenshots/task_5_features.png)

#### Frontend Output
_Screenshot:_
![New Company Files](screenshots/task_5_frontend.png)

---
