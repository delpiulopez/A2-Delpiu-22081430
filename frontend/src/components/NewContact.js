import { useState } from 'react';

function NewContact(props) {
    const { contacts, setContacts } = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    async function createContact(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                address,
            }),
        });

        const data = await response.json();

        if (data.id) {
            setContacts([...contacts, data]);
        }

        setName('');
        setAddress('');
    }

    return (
        <div className="add-contact-component">
            <form className="new-contact" onSubmit={createContact}>
                <div className="form-group">
                    <input
                        type="text"
                        id="contactName"
                        placeholder="Enter Contact Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        id="contactAddress"
                        placeholder="Enter Contact Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                </div>

                <button className="button green" type="submit">
                    Create Contact
                </button>
            </form>
        </div>
    );
}

export default NewContact;
