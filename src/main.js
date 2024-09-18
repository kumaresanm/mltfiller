//Form Fields
const name = document.querySelector(".name")
const email = document.querySelector(".email")
const phone = document.querySelector(".number")

//Form next and prev button
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")

//All Errors
const allLabelErrors = document.querySelectorAll("p")

//All Inputs
const allInputErrors = document.querySelectorAll("p")

//Fields Values
let userName;
let userEmail;
let userPhone;

const formContainer = document.querySelectorAll(".formContainer")

//All steps
const allSteps = document.querySelectorAll(".step")
let currentStep = 1

//Radio monthly + yearly
const radio = document.querySelector(".pricePlanSlider")

// CheckBoxes
const allCheckBoxes = document.querySelectorAll(".plan")
const pricePlanSlider = document.querySelector(".pricePlanSlider")

// Check Boxes Add Ons
const allAddonCheckboxes = document.querySelectorAll(".checkBoxContainer")
const innerCheckBoxesofAddons = document.querySelectorAll(".addon")

//Long JUMP BACK ON CHANGE
const changeLink = document.querySelector(".changeLink")

//monthly yearly with swtich
const actionTypes = document.querySelectorAll(".switchType")

function clearPreviousAddOns() {
    const oldData = document.querySelector(".dynamicData");
    while (oldData.firstChild) {
        oldData.removeChild(oldData.firstChild)
    }
}

const regex = {
    name: /^[A-Za-z\s'-]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]+$/,
}

function addErrorToLabel(element, errorMessage) {
    const errorParent = element.previousElementSibling.querySelector("p")
    errorParent.innerText = errorMessage
    errorParent.classList.add("showError")
}

function removeErrorFromLabel(element) {
    const errorParent = element.previousElementSibling.querySelector("p")
    errorParent.innerText = ""
    errorParent.classList.remove("showError")
}

function setFieldErrors(element, errorMessage) {
    element.classList.add("borderError")
    addErrorToLabel(element, errorMessage)
}

function removeFieldErrors(element) {
    element.classList.remove("borderError")
    removeErrorFromLabel(element)
}

function getSelectedPlanTitleAndPrice() {

    let planPrice = undefined
    let planTitle = undefined

    document.querySelectorAll(".plan").forEach((plan) => {

        if (plan.classList.contains("border")) {

            planTitle = plan.querySelector(".planTitle").innerText
            planPrice = plan.querySelector(".price").dataset.price
        }

    })

    return { planTitle, planPrice }
}

function showPlanCharges(title, type, price, currency) {
    document.querySelector(".selectedPlan").innerText = `${title} (${type})`
    document.querySelector(".selectedPlanBill").innerText = `$${price}/${currency}`
}

function getSelectedAddOnsTitleAndPrice() {

    const selectedOnes = []
    let addOnPrice = undefined
    let addOnTitle = undefined

    document.querySelectorAll(".checkBoxContainer").forEach((plan) => {

        if (plan.classList.contains("cardBorder")) {

            const tempObj = { addOnPrice: plan.lastElementChild.dataset.price, addOnTitle: plan.querySelector(".about").firstElementChild.innerText }
            selectedOnes.push(tempObj)

        }

    })

    return selectedOnes

}

function createAndShowAddons(price, title, currency) {

    const billingParent = document.querySelector(".dynamicData")
    const tempElement = document.createElement("div")
    tempElement.classList.add("ON")

    const addOnTitle = document.createElement("p")
    addOnTitle.classList.add("adTitle")
    addOnTitle.innerText = title

    const addOnPrice = document.createElement("p")
    addOnPrice.classList.add("adPrice")
    addOnPrice.innerText = `+$${price}/${currency}`

    tempElement.appendChild(addOnTitle)
    tempElement.appendChild(addOnPrice)
    billingParent.appendChild(tempElement)

}

function calculateSelectedOnesPrice(addons) {

    let totalPrice = 0
    addons.forEach((obj) => {
        totalPrice += parseInt(obj.addOnPrice)
    })

    return totalPrice

}

function showTotalCharges(total, type, currency) {

    const totalElement = document.querySelector(".totalBill")
    totalElement.firstElementChild.innerText = `Total (${type})`
    totalElement.lastElementChild.innerText = `${type === "per month" ? "+" : ""}$${total}/${currency}`

}

function showReceipt() {

    // if false monthly otherwise yearly
    if (radio.checked === false) {

        //plan price assigning
        const { planTitle, planPrice } = getSelectedPlanTitleAndPrice()
        console.log(planTitle)
        showPlanCharges(planTitle, "Monthly", planPrice, "mo")

        //Add ons displaying
        const selectedOnes = getSelectedAddOnsTitleAndPrice()
        selectedOnes.forEach((addON) => {
            createAndShowAddons(addON.addOnPrice, addON.addOnTitle, "mo")
        })

        //Show final Bill
        const selectedOnesPrice = calculateSelectedOnesPrice(selectedOnes)
        const totalPrice = parseInt(planPrice) + selectedOnesPrice
        showTotalCharges(totalPrice, "per month", "mo")

    } else {

        //plan price assigning
        const { planTitle, planPrice } = getSelectedPlanTitleAndPrice()
        showPlanCharges(planTitle, "Yearly", planPrice, "yr")

        //Add ons displaying
        const selectedOnes = getSelectedAddOnsTitleAndPrice()
        selectedOnes.forEach((addON) => {
            createAndShowAddons(addON.addOnPrice, addON.addOnTitle, "yr")
        })

        //Show final Bill
        const selectedOnesPrice = calculateSelectedOnesPrice(selectedOnes)
        const totalPrice = parseInt(planPrice) + selectedOnesPrice
        showTotalCharges(totalPrice, "per year", "yr")

    }
}

function getNameError(name) {

    if (name.length === 0) {
        return "This Field is required"

    } else {

        if (!regex.name.test(name)) {
            return "Enter a Valid Name"
        }

        return

    }

}

function getEmailError(email) {

    if (email.length === 0) {
        return "This Field is required"

    } else {

        if (!regex.email.test(email)) {
            return "Enter a Valid Email"
        }

        return

    }

}

function getPhoneError(phone) {

    if (phone.length === 0) {
        return "This Field is required"

    } else {

        if (!regex.phone.test(phone)) {
            return "Enter a Valid Phone Number"
        }

        return

    }

}

function validateAllFields() {

    const nameError = getNameError(name.value)
    nameError === undefined ? removeFieldErrors(name) : setFieldErrors(name, nameError)

    const emailError = getEmailError(email.value)
    emailError === undefined ? removeFieldErrors(email) : setFieldErrors(email, emailError)

    const phoneError = getPhoneError(phone.value)
    phoneError === undefined ? removeFieldErrors(phone) : setFieldErrors(phone, phoneError)
}

function checkAllLabelErrors() {
    return Array.from(allLabelErrors).some((error) => error.className.includes("showError"))
}

function checkAllInputErrors() {
    return Array.from(allInputErrors).some((input) => input.className.includes("showError"))
}

function incrementStep() {
    currentStep = currentStep < allSteps.length ? currentStep + 1 : 1
}

function decrementStep() {
    currentStep = currentStep > 1 ? currentStep - 1 : 1
}

/* function changeStepNumber() {

    allSteps.forEach((step) => {

        if (step.className.includes("active")) {
            step.classList.remove("active")
        }

        if (parseInt(step.dataset.step) === currentStep) {
            step.classList.add("active")
        }

    })
} */

function changeStepNumber() {
  
    allSteps.forEach((step) => {
      
        const stepNumber = parseInt(step.dataset.step);
      
        if (stepNumber <= currentStep) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
      
    });
  
}

function changeForBackBtns() {

    nextBtn.dataset.step = currentStep
    prevBtn.dataset.step = currentStep

    if (parseInt(prevBtn.dataset.step) === 1) {
        prevBtn.classList.add("hideBtn")

    } else {
        prevBtn.classList.remove("hideBtn")
    }

    if (parseFloat(nextBtn.dataset.step) === 5) {
        document.querySelector(".btnWrapper").style.display = "none"
    }

    if (parseFloat(nextBtn.dataset.step) === 4) {
        nextBtn.innerText = "Confirm"
        nextBtn.classList.add("confirm")

    } else {
        nextBtn.innerText = "Next Step"
        nextBtn.style.backgroundColor = "hsl(213, 96%, 18%)"
        nextBtn.classList.remove("confirm")
    }

}

function changeForm() {

    formContainer.forEach((form) => {

        if (parseInt(form.dataset.step) === currentStep) {
            form.classList.remove("hide")

        } else {
            form.classList.add("hide")
        }

    })

}

function applyPriceChangeOnPlan(priceElement, price, type) {
    priceElement.dataset.price = price
    priceElement.innerText = `$${price}/${type}`
}

function applyPriceChangeOnAddon(priceElement, price, type) {
    priceElement.dataset.price = price
    priceElement.innerText = `+$${price}/${type}`
}

function removeFreeStatement(checkBox) {
    const freeStatement = checkBox.querySelector(".innerPlan").lastElementChild
    freeStatement.classList.remove("hide")
}

function addFreeStatement(checkBox) {
    const freeStatement = checkBox.querySelector(".innerPlan").lastElementChild
    freeStatement.classList.add("hide")
}

function setActiveType() {

    console.log(actionTypes)
    actionTypes.forEach((type) => {
        type.classList.toggle("activeType")
    })
}

function applyPlanValidation() {

    const isPlanSelected = Array.from(document.querySelectorAll(".plan")).some((plan) => plan.classList.contains("border"))

    if (isPlanSelected === false) {
        document.querySelector(".planError").style.display = "block"

    } else {
        document.querySelector(".planError").style.display = "none"
    }

}

function applyYearlyChargesOnPlans() {

    allCheckBoxes.forEach((checkBox) => {

        const priceElement = checkBox.querySelector(".price")
        const planType = priceElement.previousElementSibling.innerText

        if (planType === "Arcade") {
            applyPriceChangeOnPlan(priceElement, 90, 'yr')
        }

        if (planType === "Advanced") {
            applyPriceChangeOnPlan(priceElement, 120, 'yr')
        }

        if (planType === "Pro") {
            applyPriceChangeOnPlan(priceElement, 150, 'yr')
        }

        removeFreeStatement(checkBox)

    })

}

function applyMonthlyChargesOnPlans() {

    allCheckBoxes.forEach((checkBox) => {

        const priceElement = checkBox.querySelector(".price")
        const planType = priceElement.previousElementSibling.innerText

        if (planType === "Arcade") {
            applyPriceChangeOnPlan(priceElement, 9, 'mo')
        }

        if (planType === "Advanced") {
            applyPriceChangeOnPlan(priceElement, 12, 'mo')
        }

        if (planType === "Pro") {
            applyPriceChangeOnPlan(priceElement, 15, 'mo')
        }

        addFreeStatement(checkBox)

    })

}

function applyYearlyChargesOnAddons() {

    allAddonCheckboxes.forEach((checkBox) => {

        const addOnCb = checkBox.querySelector("input")
        const priceTag = checkBox.lastElementChild
        const addOnType = checkBox.querySelector(".about").firstElementChild

        if (addOnType.innerText === "Online service") {
            addOnCb.value = 10
            applyPriceChangeOnAddon(priceTag, 10, "yr")
        }

        if (addOnType.innerText === "Large Storage") {
            addOnCb.value = 20
            applyPriceChangeOnAddon(priceTag, 20, "yr")
        }

        if (addOnType.innerText === "Customizable profile") {
            addOnCb.value = 20
            applyPriceChangeOnAddon(priceTag, 20, "yr")
        }

    })

}

function applyMonthlyChargesOnAddons() {

    allAddonCheckboxes.forEach((checkBox) => {

        const addOnCb = checkBox.querySelector("input")
        const priceTag = checkBox.lastElementChild
        const addOnType = checkBox.querySelector(".about").firstElementChild

        if (addOnType.innerText === "Online service") {
            addOnCb.value = 1
            applyPriceChangeOnAddon(priceTag, 1, "mo")
        }

        if (addOnType.innerText === "Large Storage") {
            addOnCb.value = 2
            applyPriceChangeOnAddon(priceTag, 2, "mo")
        }

        if (addOnType.innerText === "Customizable profile") {
            addOnCb.value = 2
            applyPriceChangeOnAddon(priceTag, 2, "mo")
        }

    })

}

function applyYearlyChanges() {
    setActiveType()
    applyYearlyChargesOnPlans()
    applyYearlyChargesOnAddons()

}

function applyMonthlyChanges() {
    setActiveType()
    applyMonthlyChargesOnPlans()
    applyMonthlyChargesOnAddons()
}

//Name Validation
name.addEventListener("input", (e) => {
    const nameError = getNameError(e.target.value)
    nameError === undefined ? removeFieldErrors(name) : setFieldErrors(name, nameError)
})

//Email Validation
email.addEventListener("input", (e) => {
    const emailError = getEmailError(e.target.value)
    emailError === undefined ? removeFieldErrors(email) : setFieldErrors(email, emailError)
})

//Phone Validation && Using Text input even for number instead of type number because type="number" is not supported in firefox
phone.addEventListener("input", (e) => {

    const phoneError = getPhoneError(e.target.value)
    phoneError === undefined ? removeFieldErrors(phone) : setFieldErrors(phone, phoneError)

})


// NEXT BUTTON
nextBtn.addEventListener("click", (e) => {

    validateAllFields()
    const allErrors = checkAllInputErrors() || checkAllLabelErrors()

    if (!allErrors) {

        //Checking if plans are selected
        if (parseInt(e.target.dataset.step) === 2) {

            applyPlanValidation()
            const isPlanSelected = Array.from(document.querySelectorAll(".plan")).some((plan) => plan.classList.contains("border"))

            if (!isPlanSelected) {
                return
            }

        }

        //Normal steps if validations are clear
        incrementStep() //incrementing the active state
        changeStepNumber()
        changeForBackBtns()
        changeForm()

        if (currentStep === 4) {
            clearPreviousAddOns()
            showReceipt()
        }

    }

})

// BACK BUTTON
prevBtn.addEventListener("click", (e) => {

    decrementStep()
    changeStepNumber()
    changeForBackBtns()
    changeForm()

})

//Check Boxes of Plans
allCheckBoxes.forEach((checkBox) => {

    checkBox.addEventListener("click", (e) => {

        const checkedElementParent = e.target.closest(".plan")
        checkedElementParent.classList.toggle("border")

        applyPlanValidation()

        allCheckBoxes.forEach((otherCheckBox) => {
            if (otherCheckBox !== checkedElementParent) {
                otherCheckBox.classList.remove("border")
            }
        })

    })

})

//Add on CheckBoxes
allAddonCheckboxes.forEach((checkBox) => {

    checkBox.addEventListener("click", (e) => {

        const checkedElementParent = e.currentTarget;
        const checkedElementCb = checkedElementParent.querySelector(".addon");

        clearPreviousAddOns()

        checkedElementParent.classList.toggle("cardBorder");
        checkedElementCb.checked = !checkedElementCb.checked;
    })

})

innerCheckBoxesofAddons.forEach((cb) => {
    cb.addEventListener("click", (e) => {
        const checkedElementParent = e.currentTarget.closest(".checkBoxContainer");
        checkedElementParent.classList.toggle("cardBorder")
        e.stopPropagation() // Preventing event propagation to parent container
    });
});

//PLAN SLIDER
pricePlanSlider.addEventListener("click", (e) => {

    // Removing all the selected items so they don't conflct with new change of switch => step 3
    allAddonCheckboxes.forEach((cb) => cb.classList.remove("cardBorder"))
    innerCheckBoxesofAddons.forEach((cb) => cb.checked = false)

    // Remove all child elements of billingParent if month year switch changes so old data gets deleted => step 4
    clearPreviousAddOns()

    e.target.checked === true ? applyYearlyChanges() : applyMonthlyChanges()

})

changeLink.addEventListener("click", () => {

    currentStep = 1
    changeStepNumber()
    changeForBackBtns()
    changeForm()

})

function resetAllInputs() {

    // Get references to the form
    const name = document.querySelector(".form")
    const inputFields = name.querySelectorAll("input")

    //Reset values of inputs
    inputFields.forEach((input) => {
        input.value = ""
    })
    
    // all checkboxes and radios in all forms are false on load
    radio.checked = false
    innerCheckBoxesofAddons.forEach((cb) => cb.checked = false)
}

resetAllInputs()