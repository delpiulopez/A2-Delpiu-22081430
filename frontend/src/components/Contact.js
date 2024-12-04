import { useState, useEffect } from 'react';
import PhoneList from './PhoneList.js';

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then((response) => response.json())
            .then((data) => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [contact.id]); // Add `contact.id` as a dependency to avoid unnecessary calls

    const expandStyle = {
        display: expanded ? 'block' : 'none',
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => c.id !== contact.id);
        setContacts(newContacts);
    }

    return (
        <div className="contact" onClick={(e) => setExpanded(!expanded)}>
            <div className="contact-summary">
                <h3>Contact Summary</h3>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Address:</strong> {contact.address}</p>
                <button className="button red" onClick={doDelete}>
                    Delete Contact
                </button>
            </div>

            {/* Expandable section for phone list */}
            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;
