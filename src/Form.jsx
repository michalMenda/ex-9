import React, { useState } from "react"
//עיצוב
function Form() {
    const [error, setError] = useState('');
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            takeDate: "",
            returnDate: "",
            specialRequest: "",
            typeCreditCard: "",
            numCreditCard: "",
            creditCardValid: "",
        }
    )

    function handleChange(event) {
        console.log(event);
        const input = event.target;
        var valid = input.checkValidity();

        if (!valid) {
            input.style.backgroundColor = "rgb(237, 176, 176)";
        } else {
            input.style.backgroundColor = "white";
        }
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        console.log(formData);
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (formData.takeDate < formData.returnDate) {
            setError('')
            localStorage.setItem(formData.email, JSON.stringify(formData));
            setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                takeDate: "",
                returnDate: "",
                specialRequest: "",
                typeCreditCard: "",
                numCreditCard: "",
                creditCardValid: ""
            })
        }
        else {
            setError('the return date is wrong')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                pattern="[a-zA-Z]{2,15}"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                pattern="[a-zA-Z]{2,15}"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
                required
            />
            <input
                type="text"
                placeholder="phone number"
                pattern="[0-9]{10}"
                onChange={handleChange}
                name="phone"
                value={formData.phone}
                required
            />
            <input
                type="email"
                placeholder="Email"
                pattern=".*@.*"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
            />
            <textarea
                value={formData.specialRequest}
                placeholder="specialRequest"
                onChange={handleChange}
                name="specialRequest"
                required
            />
            <input
                type="date"
                value={formData.takeDate}
                onChange={handleChange}
                placeholder="takeDate"
                name="takeDate"
                min={new Date().toISOString().slice(0, 7)}
                required
            />
            <input
                type="date"
                value={formData.returnDate}
                onChange={handleChange}
                placeholder="returnDate"
                name="returnDate"
                min={new Date().toISOString().slice(0, 7)}
                required
            />


            <label htmlFor="typeCreditCard">What is your type creditCard?</label>
            <br />
            <select
                id="typeCreditCard"
                value={formData.typeCreditCard}
                onChange={handleChange}
                name="typeCreditCard"
            >
                <option value="direct">direct</option>
                <option value="max">max</option>
                <option value="cal">cal</option>
                <option value="visa">visa</option>
                <option value="AmericanExpres">American Expres</option>
            </select>
            <input
                type="text"
                value={formData.numCreditCard}
                pattern="[0-9]{16}"
                onChange={handleChange}
                placeholder="numCreditCard"
                name="numCreditCard"
                required
            />
            <input
                type="month"
                name="creditCardValid"
                onChange={handleChange}
                value={formData.creditCardValid}
                min="2024-01"
                max="2034-12"
                required
            />
            <button>Submit</button>
            <div>{error}</div>
        </form>
    )
}
export default Form;
