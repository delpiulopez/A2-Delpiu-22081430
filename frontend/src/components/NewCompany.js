import { useState } from "react";

function NewCompany(props) {
    const { contact, companies, setCompanies } = props;

    if (!contact || !contact.id) {
        return <p>No contact selected to associate a company with.</p>;
    }

    const [company_name, setCompanyName] = useState("");
    const [company_address, setCompanyAddress] = useState("");

    async function createCompany(e) {
        e.preventDefault();

        const response = await fetch(
            `http://localhost/api/companies/${contact.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ company_name, company_address }),
            }
        );

        const data = await response.json();

        if (data.company_id) {
            setCompanies([...companies, data]);
        }

        setCompanyName("");
        setCompanyAddress("");
    }

    return (
        <form
            onSubmit={createCompany}
            onClick={(e) => e.stopPropagation()}
            className="new-company"
        >
            <input
                type="text"
                placeholder="Company Name"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company Address"
                value={company_address}
                onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <button className="button green" type="submit">
                Add New Company
            </button>
        </form>
    );
}

export default NewCompany;
