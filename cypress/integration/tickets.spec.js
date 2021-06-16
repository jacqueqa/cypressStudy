const { it } = require("mocha");

describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))
    
    it("fills all the text input fields", () => {
        const firstName = "Jacqueline";
        const lastName = "Tatiani";

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("jacque@gmail.com");
    cy.get("#requests").type("Meat");
    cy.get("#signature").type(`${firstName} ${lastName}`);   
    });
//Interação de dados tipo Select
    it("Select two tickets", () => { 
    cy.get("#ticket-quantity").select("2");
    });
//Interação com RadioButtons
    it("select 'vip' ticket type", () => {
    cy.get("#vip").check();   
    });
//Interação com checkbox
    it("select 'social media' checkbox", () => {
    cy.get("#social-media").check();    
    });

    it("Select 'friend', and 'publication', then uncheck 'friend'", () => {
    cy.get("#friend").check();
    cy.get("#publication").check();
    cy.get("#friend").uncheck();
    });
//Assertions
    it("has 'TICKETBOX' header's heading", () =>{
    cy.get("header h1").should("contain", "TICKETBOX")    
    });
//Uso de alias
    it("Alert on invalid e-mail",() => {
    cy.get("#email")
    .as("email")
    .type("jacque-gmail.com");
    cy.get("#email.invalid").should("exist");  

    cy.get("@email")
    .clear()
    .type("jacque@gmail.com");

    cy.get("#email.invalid").should("not.exist");  
    });
    
//E2E    
    it("Fill and reset the form", () => {
        const firstName = "Jacqueline";
        const lastName = "Tatiani";
        const fullName = `${firstName} ${lastName}`;

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("jacque@gmail.com");
    cy.get("#ticket-quantity").select("2");
    cy.get("#vip").check();   
    cy.get("#friend").check();
    cy.get("#requests").type("Amber Ale beer");

    cy.get(".agreement p").should(
        "contain",
        `I, ${fullName}, wish to buy 2 VIP tickets`
    );
    
    cy.get("#agree").click();
    cy.get("#signature").type(fullName);
    cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

    cy.get("button[type='reset']").click();
    cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory fiels using support command", () =>{
    const customer = {
        firstName: "Jon",
        lastName: "Doe",
        email: "jondoe@example.com"
        };

//Criação de Comandos(função)
    cy.fillMandatoryFields(customer);
    cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

    cy.get("#agree").uncheck();
    cy.get("@submitButton").should("be.disabled");
    });

});  