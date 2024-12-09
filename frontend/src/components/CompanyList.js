import { useState } from "react";
import Company from "./Company";

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;
    const [newCompanyName, setNewCompanyName] = useState("");
    const [newCompanyAddress, setNewCompanyAddress] = useState("");

    async function addCompany(e) {
        e.preventDefault();

        const response = await fetch(
            `http://localhost/api/companies/${contact.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: newCompanyName,
                    company_address: newCompanyAddress,
                }),
            }
        );

        const data = await response.json();

        if (data.company_id) {
            setCompanies([...companies, data]);
        }

        setNewCompanyName("");
        setNewCompanyAddress("");
    }

    return (
        <div className="company-list">
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => {
                        return (
                            <Company
                                key={company.company_id}
                                company={company}
                                companies={companies}
                                setCompanies={setCompanies}
                                contact={contact}
                            />
                        );
                    })}
                </tbody>
            </table>

            <form className="new-company" onSubmit={addCompany}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company Address"
                    value={newCompanyAddress}
                    onChange={(e) => setNewCompanyAddress(e.target.value)}
                />
                <button className="button green" type="submit">
                    Add New Company
                </button>
            </form>
        </div>
    );
}

export default CompanyList;
