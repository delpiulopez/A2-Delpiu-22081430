import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setNumber] = useState('');
    const [phone_type, setPhoneType] = useState('');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number,
                phone_type
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setPhoneType('');
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select
                onChange={(e) => setPhoneType(e.target.value)}
                value={phone_type}
            >
            <option value="" disabled>Select Category</option>
            <option value="Mobile">Mobile</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Fax">Fax</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={phone_number}/>
            <button className='button green' type='submit'>Add to Lopez's Phone</button>
        </form>
    );
}

export default NewPhone;