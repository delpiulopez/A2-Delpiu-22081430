import { useState, useEffect } from "react";
import PhoneList from "./PhoneList.js";
import CompanyList from "./CompanyList.js";

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then((response) => response.json())
            .then((data) => setPhones(data))
            .catch((error) => console.error("Error fetching phones:", error));
    }, [contact.id]);

    useEffect(() => {
        fetch(`http://localhost/api/companies/${contact.id}`)
            .then((response) => response.json())
            .then((data) => setCompanies(data))
            .catch((error) => console.error("Error fetching companies:", error));
    }, [contact.id]);

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setContacts(contacts.filter((c) => c.id !== contact.id));
        }
    }

    return (
        <div className="contact" onClick={() => setExpanded(!expanded)}>
            <div className="contact-summary">
                <h3>Contact Summary</h3>
                <div className="contact-info">
                    <p>
                        <strong>Name:</strong> {contact.name}
                    </p>
                    <p>
                        <strong>Address:</strong> {contact.address}
                    </p>
                </div>
                <button className="button red" onClick={doDelete}>
                    Delete Contact
                </button>
            </div>

            {expanded && (
                <div className="expanded-section" onClick={(e) => e.stopPropagation()}>
                    <h4>Companies</h4>
                    <CompanyList
                        contact={contact}
                        companies={companies}
                        setCompanies={setCompanies}
                    />
                    <h4>Phones</h4>
                    <PhoneList
                        phones={phones}
                        setPhones={setPhones}
                        contact={contact}
                    />
                </div>
            )}
        </div>
    );
}

export default Contact;
