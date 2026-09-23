// Book Haven Bookstore - Final Touchstone
// JavaScript, sessionStorage, and localStorage Features

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // Shopping Cart - sessionStorage
    // ========================================

    let cart = JSON.parse(
        sessionStorage.getItem("cart")
    ) || [];

    let pendingOrder = false;


    // ========================================
    // Storage Helper Functions
    // ========================================

    function getStoredMembers() {

        return JSON.parse(
            localStorage.getItem("bookHavenMembers")
        ) || [];
    }


    function saveStoredMembers(members) {

        localStorage.setItem(
            "bookHavenMembers",
            JSON.stringify(members)
        );
    }


    function getStoredOrders() {

        return JSON.parse(
            localStorage.getItem("bookHavenOrders")
        ) || [];
    }


    function saveStoredOrders(orders) {

        localStorage.setItem(
            "bookHavenOrders",
            JSON.stringify(orders)
        );
    }


    // ========================================
    // Current Customer Session
    // ========================================

    function getCurrentCustomer() {

        return JSON.parse(
            sessionStorage.getItem(
                "bookHavenCurrentCustomer"
            )
        );
    }


    function setCurrentCustomer(customer) {

        sessionStorage.setItem(
            "bookHavenCurrentCustomer",
            JSON.stringify(customer)
        );

        updateCustomerStatus();
    }


    function updateCustomerStatus() {

        const customerStatusButton =
            document.querySelector(
                "#customerStatusButton"
            );

        if (!customerStatusButton) {
            return;
        }

        const currentCustomer =
            getCurrentCustomer();


        if (!currentCustomer) {

            customerStatusButton.textContent =
                "Login / Register";

            return;
        }


        if (
            currentCustomer.type === "member" &&
            currentCustomer.memberId
        ) {

            customerStatusButton.textContent =
                "Welcome, Dear " +
                currentCustomer.memberId;

            return;
        }


        if (
            currentCustomer.type === "guest"
        ) {

            customerStatusButton.textContent =
                "Welcome, Dear Guest";

            return;
        }


        customerStatusButton.textContent =
            "Login / Register";
    }


    updateCustomerStatus();


    // ========================================
    // Subscribe Feature
    // ========================================

    const subscribeButton =
        document.querySelector(
            "#subscribeButton"
        );

    if (subscribeButton) {

        subscribeButton.addEventListener(
            "click",
            function () {

                const subscribeForm =
                    subscribeButton.closest(
                        "form"
                    );

                const emailInput =
                    subscribeForm.querySelector(
                        'input[type="email"]'
                    );


                if (!emailInput.value.trim()) {

                    alert(
                        "Please enter your email address."
                    );

                    emailInput.focus();

                    return;
                }


                if (!emailInput.checkValidity()) {

                    alert(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;
                }


                alert(
                    "Thank you for subscribing."
                );

                emailInput.value = "";
            }
        );
    }


    // ========================================
    // Add to Cart Feature
    // ========================================

    const addToCartButtons =
        document.querySelectorAll(
            ".addToCart"
        );

    addToCartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const itemName =
                        button.getAttribute(
                            "data-item"
                        );

                    cart = JSON.parse(
                        sessionStorage.getItem(
                            "cart"
                        )
                    ) || [];

                    cart.push(itemName);

                    sessionStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );

                    alert(
                        itemName +
                        " added to the cart."
                    );
                }
            );
        }
    );


    // ========================================
    // Shopping Cart Modal
    // ========================================

    const viewCartButton =
        document.querySelector(
            "#viewCart"
        );

    const cartModal =
        document.querySelector(
            "#cartModal"
        );

    const closeCartButton =
        document.querySelector(
            "#closeCart"
        );

    const cartItems =
        document.querySelector(
            "#cartItems"
        );


    function displayCart() {

        if (!cartItems) {
            return;
        }


        cart = JSON.parse(
            sessionStorage.getItem(
                "cart"
            )
        ) || [];


        cartItems.innerHTML = "";


        if (cart.length === 0) {

            const emptyMessage =
                document.createElement(
                    "p"
                );

            emptyMessage.textContent =
                "Your cart is empty.";

            cartItems.appendChild(
                emptyMessage
            );

            return;
        }


        const cartList =
            document.createElement(
                "ul"
            );


        cart.forEach(
            function (item) {

                const listItem =
                    document.createElement(
                        "li"
                    );

                listItem.textContent =
                    item;

                cartList.appendChild(
                    listItem
                );
            }
        );


        cartItems.appendChild(
            cartList
        );
    }


    if (viewCartButton && cartModal) {

        viewCartButton.addEventListener(
            "click",
            function () {

                displayCart();

                cartModal.style.display =
                    "block";

                if (closeCartButton) {
                    closeCartButton.focus();
                }
            }
        );
    }


    if (closeCartButton && cartModal) {

        closeCartButton.addEventListener(
            "click",
            function () {

                cartModal.style.display =
                    "none";

                if (viewCartButton) {
                    viewCartButton.focus();
                }
            }
        );
    }


    // ========================================
    // Clear Cart
    // ========================================

    const clearCartButton =
        document.querySelector(
            "#clearCart"
        );

    if (clearCartButton) {

        clearCartButton.addEventListener(
            "click",
            function () {

                cart = [];

                sessionStorage.removeItem(
                    "cart"
                );

                displayCart();

                alert(
                    "Cart cleared."
                );
            }
        );
    }


    // ========================================
    // Customer Modal
    // ========================================

    const customerModal =
        document.querySelector(
            "#customerModal"
        );

    const closeCustomerModal =
        document.querySelector(
            "#closeCustomerModal"
        );

    const customerStatusButton =
        document.querySelector(
            "#customerStatusButton"
        );

    const showNewMemberButton =
        document.querySelector(
            "#showNewMember"
        );

    const showExistingMemberButton =
        document.querySelector(
            "#showExistingMember"
        );

    const showGuestButton =
        document.querySelector(
            "#showGuest"
        );

    const newMemberSection =
        document.querySelector(
            "#newMemberSection"
        );

    const existingMemberSection =
        document.querySelector(
            "#existingMemberSection"
        );

    const guestSection =
        document.querySelector(
            "#guestSection"
        );


    function hideCustomerSections() {

        if (newMemberSection) {

            newMemberSection.style.display =
                "none";
        }


        if (existingMemberSection) {

            existingMemberSection.style.display =
                "none";
        }


        if (guestSection) {

            guestSection.style.display =
                "none";
        }
    }


    function openCustomerModal() {

        if (!customerModal) {
            return;
        }


        hideCustomerSections();

        customerModal.style.display =
            "block";


        if (showNewMemberButton) {

            showNewMemberButton.focus();
        }
    }


    function closeCustomerWindow() {

        if (!customerModal) {
            return;
        }


        customerModal.style.display =
            "none";

        hideCustomerSections();
    }


    // ========================================
    // Customer Status Button
    // Works on All Pages
    // ========================================

    if (customerStatusButton) {

        customerStatusButton.addEventListener(
            "click",
            function () {

                // Gallery page contains
                // the customer modal.
                if (customerModal) {

                    openCustomerModal();

                    return;
                }


                // Other pages redirect
                // to Gallery and request
                // automatic modal opening.
                sessionStorage.setItem(
                    "openBookHavenCustomerModal",
                    "true"
                );

                window.location.href =
                    "gallery.html";
            }
        );
    }


    // ========================================
    // Automatically Open Customer Modal
    // After Redirect to Gallery
    // ========================================

    if (
        customerModal &&
        sessionStorage.getItem(
            "openBookHavenCustomerModal"
        ) === "true"
    ) {

        sessionStorage.removeItem(
            "openBookHavenCustomerModal"
        );

        openCustomerModal();
    }


    if (closeCustomerModal) {

        closeCustomerModal.addEventListener(
            "click",
            function () {

                closeCustomerWindow();

                if (customerStatusButton) {

                    customerStatusButton.focus();
                }
            }
        );
    }


    // ========================================
    // Customer Option Buttons
    // ========================================

    if (showNewMemberButton) {

        showNewMemberButton.addEventListener(
            "click",
            function () {

                hideCustomerSections();

                if (newMemberSection) {

                    newMemberSection.style.display =
                        "block";
                }


                const firstField =
                    document.querySelector(
                        "#memberName"
                    );

                if (firstField) {

                    firstField.focus();
                }
            }
        );
    }


    if (showExistingMemberButton) {

        showExistingMemberButton.addEventListener(
            "click",
            function () {

                hideCustomerSections();

                if (existingMemberSection) {

                    existingMemberSection.style.display =
                        "block";
                }


                const memberIdField =
                    document.querySelector(
                        "#existingMemberId"
                    );

                if (memberIdField) {

                    memberIdField.focus();
                }
            }
        );
    }


    if (showGuestButton) {

        showGuestButton.addEventListener(
            "click",
            function () {

                hideCustomerSections();

                if (guestSection) {

                    guestSection.style.display =
                        "block";
                }


                const guestNameField =
                    document.querySelector(
                        "#guestName"
                    );

                if (guestNameField) {

                    guestNameField.focus();
                }
            }
        );
    }


    // ========================================
    // Member ID Generator
    // BH311, BH312, BH313...
    // ========================================

    function generateMemberId() {

        const members =
            getStoredMembers();


        let highestMemberNumber = 310;


        members.forEach(
            function (member) {

                if (
                    member.memberId &&
                    /^BH\d+$/.test(
                        member.memberId
                    )
                ) {

                    const memberNumber =
                        parseInt(
                            member.memberId.substring(
                                2
                            ),
                            10
                        );


                    if (
                        memberNumber >
                        highestMemberNumber
                    ) {

                        highestMemberNumber =
                            memberNumber;
                    }
                }
            }
        );


        const storedCounter =
            parseInt(
                localStorage.getItem(
                    "bookHavenLastMemberNumber"
                ),
                10
            );


        if (
            !isNaN(storedCounter) &&
            storedCounter >
            highestMemberNumber
        ) {

            highestMemberNumber =
                storedCounter;
        }


        let nextNumber =
            highestMemberNumber + 1;

        let newMemberId =
            "BH" + nextNumber;


        while (
            members.some(
                function (member) {

                    return (
                        member.memberId ===
                        newMemberId
                    );
                }
            )
        ) {

            nextNumber++;

            newMemberId =
                "BH" + nextNumber;
        }


        localStorage.setItem(
            "bookHavenLastMemberNumber",
            nextNumber.toString()
        );


        return newMemberId;
    }


    // ========================================
    // General Validation Helpers
    // ========================================

    function showFieldError(
        input,
        errorElement,
        message
    ) {

        if (errorElement) {

            errorElement.textContent =
                message;
        }


        if (input) {

            input.classList.add(
                "input-error"
            );

            input.setAttribute(
                "aria-invalid",
                "true"
            );
        }
    }


    function clearFieldError(
        input,
        errorElement
    ) {

        if (errorElement) {

            errorElement.textContent =
                "";
        }


        if (input) {

            input.classList.remove(
                "input-error"
            );

            input.removeAttribute(
                "aria-invalid"
            );
        }
    }


    // ========================================
    // New Membership Registration
    // ========================================

    const newMemberForm =
        document.querySelector(
            "#newMemberForm"
        );

    if (newMemberForm) {

        const memberName =
            document.querySelector(
                "#memberName"
            );

        const memberPhone =
            document.querySelector(
                "#memberPhone"
            );

        const memberAddress =
            document.querySelector(
                "#memberAddress"
            );

        const memberEmail =
            document.querySelector(
                "#memberEmail"
            );

        const memberNameError =
            document.querySelector(
                "#memberNameError"
            );

        const memberPhoneError =
            document.querySelector(
                "#memberPhoneError"
            );

        const memberAddressError =
            document.querySelector(
                "#memberAddressError"
            );

        const memberEmailError =
            document.querySelector(
                "#memberEmailError"
            );


        newMemberForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearFieldError(
                    memberName,
                    memberNameError
                );

                clearFieldError(
                    memberPhone,
                    memberPhoneError
                );

                clearFieldError(
                    memberAddress,
                    memberAddressError
                );

                clearFieldError(
                    memberEmail,
                    memberEmailError
                );


                let formIsValid = true;


                if (!memberName.value.trim()) {

                    showFieldError(
                        memberName,
                        memberNameError,
                        "Full name is required."
                    );

                    formIsValid = false;
                }


                if (!memberPhone.value.trim()) {

                    showFieldError(
                        memberPhone,
                        memberPhoneError,
                        "Phone number is required."
                    );

                    formIsValid = false;
                }


                if (!memberAddress.value.trim()) {

                    showFieldError(
                        memberAddress,
                        memberAddressError,
                        "Address is required."
                    );

                    formIsValid = false;
                }


                if (!memberEmail.value.trim()) {

                    showFieldError(
                        memberEmail,
                        memberEmailError,
                        "Email address is required."
                    );

                    formIsValid = false;

                } else if (
                    !memberEmail.checkValidity()
                ) {

                    showFieldError(
                        memberEmail,
                        memberEmailError,
                        "Please enter a valid email address."
                    );

                    formIsValid = false;
                }


                if (!formIsValid) {

                    const firstInvalid =
                        newMemberForm.querySelector(
                            ".input-error"
                        );

                    if (firstInvalid) {

                        firstInvalid.focus();
                    }

                    return;
                }


                const memberId =
                    generateMemberId();


                const newMember = {

                    memberId:
                        memberId,

                    name:
                        memberName.value.trim(),

                    phone:
                        memberPhone.value.trim(),

                    address:
                        memberAddress.value.trim(),

                    email:
                        memberEmail.value.trim(),

                    registeredAt:
                        new Date().toISOString()
                };


                const members =
                    getStoredMembers();

                members.push(
                    newMember
                );

                saveStoredMembers(
                    members
                );


                setCurrentCustomer({

                    type: "member",

                    memberId:
                        newMember.memberId,

                    name:
                        newMember.name,

                    phone:
                        newMember.phone,

                    address:
                        newMember.address,

                    email:
                        newMember.email,

                    newRegistration: true
                });


                newMemberForm.reset();

                closeCustomerWindow();


                if (pendingOrder) {

                    completeOrder();

                } else {

                    alert(
                        "Registration successful. " +
                        "Your Member ID is " +
                        memberId +
                        "."
                    );


                    const currentCustomer =
                        getCurrentCustomer();

                    if (currentCustomer) {

                        currentCustomer.newRegistration =
                            false;

                        setCurrentCustomer(
                            currentCustomer
                        );
                    }
                }
            }
        );


        memberName.addEventListener(
            "input",
            function () {

                if (
                    memberName.value.trim()
                ) {

                    clearFieldError(
                        memberName,
                        memberNameError
                    );
                }
            }
        );


        memberPhone.addEventListener(
            "input",
            function () {

                if (
                    memberPhone.value.trim()
                ) {

                    clearFieldError(
                        memberPhone,
                        memberPhoneError
                    );
                }
            }
        );


        memberAddress.addEventListener(
            "input",
            function () {

                if (
                    memberAddress.value.trim()
                ) {

                    clearFieldError(
                        memberAddress,
                        memberAddressError
                    );
                }
            }
        );


        memberEmail.addEventListener(
            "input",
            function () {

                if (
                    memberEmail.value.trim() &&
                    memberEmail.checkValidity()
                ) {

                    clearFieldError(
                        memberEmail,
                        memberEmailError
                    );
                }
            }
        );
    }


    // ========================================
    // Existing Member
    // ========================================

    const existingMemberForm =
        document.querySelector(
            "#existingMemberForm"
        );

    if (existingMemberForm) {

        const existingMemberId =
            document.querySelector(
                "#existingMemberId"
            );

        const existingMemberError =
            document.querySelector(
                "#existingMemberError"
            );


        existingMemberForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearFieldError(
                    existingMemberId,
                    existingMemberError
                );


                const enteredMemberId =
                    existingMemberId.value
                        .trim()
                        .toUpperCase();


                if (!enteredMemberId) {

                    showFieldError(
                        existingMemberId,
                        existingMemberError,
                        "Member ID is required."
                    );

                    existingMemberId.focus();

                    return;
                }


                if (
                    !/^BH\d+$/.test(
                        enteredMemberId
                    )
                ) {

                    showFieldError(
                        existingMemberId,
                        existingMemberError,
                        "Please enter a valid Book Haven Member ID."
                    );

                    existingMemberId.focus();

                    return;
                }


                const members =
                    getStoredMembers();


                const matchedMember =
                    members.find(
                        function (member) {

                            return (
                                member.memberId ===
                                enteredMemberId
                            );
                        }
                    );


                if (!matchedMember) {

                    showFieldError(
                        existingMemberId,
                        existingMemberError,
                        "Member ID was not found."
                    );

                    existingMemberId.focus();

                    return;
                }


                setCurrentCustomer({

                    type: "member",

                    memberId:
                        matchedMember.memberId,

                    name:
                        matchedMember.name,

                    phone:
                        matchedMember.phone,

                    address:
                        matchedMember.address,

                    email:
                        matchedMember.email,

                    newRegistration: false
                });


                existingMemberForm.reset();

                closeCustomerWindow();


                if (pendingOrder) {

                    completeOrder();

                } else {

                    alert(
                        "Welcome back, " +
                        matchedMember.memberId +
                        "."
                    );
                }
            }
        );


        existingMemberId.addEventListener(
            "input",
            function () {

                if (
                    existingMemberId.value.trim()
                ) {

                    clearFieldError(
                        existingMemberId,
                        existingMemberError
                    );
                }
            }
        );
    }


    // ========================================
    // Guest
    // ========================================

    const guestForm =
        document.querySelector(
            "#guestForm"
        );

    if (guestForm) {

        const guestName =
            document.querySelector(
                "#guestName"
            );

        const guestPhone =
            document.querySelector(
                "#guestPhone"
            );

        const guestAddress =
            document.querySelector(
                "#guestAddress"
            );

        const guestNameError =
            document.querySelector(
                "#guestNameError"
            );

        const guestPhoneError =
            document.querySelector(
                "#guestPhoneError"
            );

        const guestAddressError =
            document.querySelector(
                "#guestAddressError"
            );


        guestForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearFieldError(
                    guestName,
                    guestNameError
                );

                clearFieldError(
                    guestPhone,
                    guestPhoneError
                );

                clearFieldError(
                    guestAddress,
                    guestAddressError
                );


                let formIsValid = true;


                if (!guestName.value.trim()) {

                    showFieldError(
                        guestName,
                        guestNameError,
                        "Full name is required."
                    );

                    formIsValid = false;
                }


                if (!guestPhone.value.trim()) {

                    showFieldError(
                        guestPhone,
                        guestPhoneError,
                        "Phone number is required."
                    );

                    formIsValid = false;
                }


                if (!guestAddress.value.trim()) {

                    showFieldError(
                        guestAddress,
                        guestAddressError,
                        "Address is required."
                    );

                    formIsValid = false;
                }


                if (!formIsValid) {

                    const firstInvalid =
                        guestForm.querySelector(
                            ".input-error"
                        );

                    if (firstInvalid) {

                        firstInvalid.focus();
                    }

                    return;
                }


                setCurrentCustomer({

                    type: "guest",

                    name:
                        guestName.value.trim(),

                    phone:
                        guestPhone.value.trim(),

                    address:
                        guestAddress.value.trim()
                });


                guestForm.reset();

                closeCustomerWindow();


                if (pendingOrder) {

                    completeOrder();

                } else {

                    alert(
                        "You are continuing as a guest."
                    );
                }
            }
        );


        guestName.addEventListener(
            "input",
            function () {

                if (
                    guestName.value.trim()
                ) {

                    clearFieldError(
                        guestName,
                        guestNameError
                    );
                }
            }
        );


        guestPhone.addEventListener(
            "input",
            function () {

                if (
                    guestPhone.value.trim()
                ) {

                    clearFieldError(
                        guestPhone,
                        guestPhoneError
                    );
                }
            }
        );


        guestAddress.addEventListener(
            "input",
            function () {

                if (
                    guestAddress.value.trim()
                ) {

                    clearFieldError(
                        guestAddress,
                        guestAddressError
                    );
                }
            }
        );
    }


    // ========================================
    // Unique Confirmation Number
    // Exactly 5 Characters
    // ========================================

    function generateConfirmationNumber() {

        const characters =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        const orders =
            getStoredOrders();

        let confirmationNumber;
        let numberExists;


        do {

            confirmationNumber = "";


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        characters.length
                    );


                confirmationNumber +=
                    characters.charAt(
                        randomIndex
                    );
            }


            numberExists =
                orders.some(
                    function (order) {

                        return (
                            order.confirmationNumber ===
                            confirmationNumber
                        );
                    }
                );


        } while (numberExists);


        return confirmationNumber;
    }


    // ========================================
    // Order Confirmation Modal
    // ========================================

    const confirmationModal =
        document.querySelector(
            "#confirmationModal"
        );

    const closeConfirmationModal =
        document.querySelector(
            "#closeConfirmationModal"
        );

    const confirmationNumberElement =
        document.querySelector(
            "#confirmationNumber"
        );

    const confirmationCustomerMessage =
        document.querySelector(
            "#confirmationCustomerMessage"
        );

    const membershipConfirmation =
        document.querySelector(
            "#membershipConfirmation"
        );

    const newMemberIdElement =
        document.querySelector(
            "#newMemberId"
        );

    const finishOrderButton =
        document.querySelector(
            "#finishOrder"
        );


    function showOrderConfirmation(
        confirmationNumber,
        customer
    ) {

        if (!confirmationModal) {
            return;
        }


        if (confirmationNumberElement) {

            confirmationNumberElement.textContent =
                confirmationNumber;
        }


        if (confirmationCustomerMessage) {

            if (
                customer.type === "member"
            ) {

                confirmationCustomerMessage.textContent =
                    "Thank you for your order, " +
                    customer.memberId +
                    ".";

            } else {

                confirmationCustomerMessage.textContent =
                    "Thank you for your order.";
            }
        }


        if (
            membershipConfirmation &&
            newMemberIdElement
        ) {

            if (
                customer.type === "member" &&
                customer.newRegistration
            ) {

                newMemberIdElement.textContent =
                    customer.memberId;

                membershipConfirmation.style.display =
                    "block";

            } else {

                membershipConfirmation.style.display =
                    "none";
            }
        }


        confirmationModal.style.display =
            "block";


        if (finishOrderButton) {

            finishOrderButton.focus();
        }
    }


    // ========================================
    // Complete Order
    // ========================================

    function completeOrder() {

        cart = JSON.parse(
            sessionStorage.getItem(
                "cart"
            )
        ) || [];


        if (cart.length === 0) {

            pendingOrder = false;

            alert(
                "Your cart is empty."
            );

            return;
        }


        const customer =
            getCurrentCustomer();


        if (!customer) {

            pendingOrder = true;

            openCustomerModal();

            return;
        }


        const confirmationNumber =
            generateConfirmationNumber();


        const order = {

            confirmationNumber:
                confirmationNumber,

            customerType:
                customer.type,

            memberId:
                customer.memberId || null,

            customerName:
                customer.name,

            phone:
                customer.phone,

            address:
                customer.address,

            email:
                customer.email || null,

            items:
                cart.slice(),

            orderDate:
                new Date().toISOString()
        };


        const orders =
            getStoredOrders();

        orders.push(order);

        saveStoredOrders(
            orders
        );


        cart = [];

        sessionStorage.removeItem(
            "cart"
        );


        displayCart();


        if (cartModal) {

            cartModal.style.display =
                "none";
        }


        if (customerModal) {

            customerModal.style.display =
                "none";
        }


        pendingOrder = false;


        showOrderConfirmation(
            confirmationNumber,
            customer
        );


        if (
            customer.type === "member" &&
            customer.newRegistration
        ) {

            customer.newRegistration =
                false;

            setCurrentCustomer(
                customer
            );
        }
    }


    // ========================================
    // Process Order
    // ========================================

    const processOrderButton =
        document.querySelector(
            "#processOrder"
        );

    if (processOrderButton) {

        processOrderButton.addEventListener(
            "click",
            function () {

                cart = JSON.parse(
                    sessionStorage.getItem(
                        "cart"
                    )
                ) || [];


                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    displayCart();

                    return;
                }


                const currentCustomer =
                    getCurrentCustomer();


                if (!currentCustomer) {

                    pendingOrder = true;


                    if (cartModal) {

                        cartModal.style.display =
                            "none";
                    }


                    openCustomerModal();

                    return;
                }


                completeOrder();
            }
        );
    }


    // ========================================
    // Confirmation Modal Controls
    // ========================================

    function closeConfirmationWindow() {

        if (confirmationModal) {

            confirmationModal.style.display =
                "none";
        }


        if (viewCartButton) {

            viewCartButton.focus();
        }
    }


    if (closeConfirmationModal) {

        closeConfirmationModal.addEventListener(
            "click",
            function () {

                closeConfirmationWindow();
            }
        );
    }


    if (finishOrderButton) {

        finishOrderButton.addEventListener(
            "click",
            function () {

                closeConfirmationWindow();
            }
        );
    }


    // ========================================
    // Close Modals by Clicking Outside
    // ========================================

    if (cartModal) {

        cartModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    cartModal
                ) {

                    cartModal.style.display =
                        "none";


                    if (viewCartButton) {

                        viewCartButton.focus();
                    }
                }
            }
        );
    }


    if (customerModal) {

        customerModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    customerModal
                ) {

                    closeCustomerWindow();
                }
            }
        );
    }


    if (confirmationModal) {

        confirmationModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    confirmationModal
                ) {

                    closeConfirmationWindow();
                }
            }
        );
    }


    // ========================================
    // Escape Key
    // ========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (
                confirmationModal &&
                confirmationModal.style.display ===
                "block"
            ) {

                closeConfirmationWindow();

                return;
            }


            if (
                customerModal &&
                customerModal.style.display ===
                "block"
            ) {

                closeCustomerWindow();

                return;
            }


            if (
                cartModal &&
                cartModal.style.display ===
                "block"
            ) {

                cartModal.style.display =
                    "none";


                if (viewCartButton) {

                    viewCartButton.focus();
                }
            }
        }
    );


    // ========================================
    // Contact Form - localStorage
    // ========================================

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    if (contactForm) {

        const nameInput =
            document.querySelector(
                "#name"
            );

        const emailInput =
            document.querySelector(
                "#email"
            );

        const phoneInput =
            document.querySelector(
                "#phone"
            );

        const messageInput =
            document.querySelector(
                "#message"
            );

        const customOrderInput =
            document.querySelector(
                "#customOrder"
            );

        const nameError =
            document.querySelector(
                "#nameError"
            );

        const emailError =
            document.querySelector(
                "#emailError"
            );

        const messageError =
            document.querySelector(
                "#messageError"
            );


        function clearValidationErrors() {

            nameError.textContent = "";
            emailError.textContent = "";
            messageError.textContent = "";

            nameInput.classList.remove(
                "input-error"
            );

            emailInput.classList.remove(
                "input-error"
            );

            messageInput.classList.remove(
                "input-error"
            );

            nameInput.removeAttribute(
                "aria-invalid"
            );

            emailInput.removeAttribute(
                "aria-invalid"
            );

            messageInput.removeAttribute(
                "aria-invalid"
            );
        }


        function validateContactForm() {

            clearValidationErrors();

            let formIsValid = true;


            if (!nameInput.value.trim()) {

                nameError.textContent =
                    "Name is required.";

                nameInput.classList.add(
                    "input-error"
                );

                nameInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                formIsValid = false;
            }


            if (!emailInput.value.trim()) {

                emailError.textContent =
                    "Email address is required.";

                emailInput.classList.add(
                    "input-error"
                );

                emailInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                formIsValid = false;

            } else if (
                !emailInput.checkValidity()
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                emailInput.classList.add(
                    "input-error"
                );

                emailInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                formIsValid = false;
            }


            if (!messageInput.value.trim()) {

                messageError.textContent =
                    "Feedback or custom order information is required.";

                messageInput.classList.add(
                    "input-error"
                );

                messageInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                formIsValid = false;
            }


            return formIsValid;
        }


        nameInput.addEventListener(
            "input",
            function () {

                if (
                    nameInput.value.trim()
                ) {

                    nameError.textContent =
                        "";

                    nameInput.classList.remove(
                        "input-error"
                    );

                    nameInput.removeAttribute(
                        "aria-invalid"
                    );
                }
            }
        );


        emailInput.addEventListener(
            "input",
            function () {

                if (
                    emailInput.value.trim() &&
                    emailInput.checkValidity()
                ) {

                    emailError.textContent =
                        "";

                    emailInput.classList.remove(
                        "input-error"
                    );

                    emailInput.removeAttribute(
                        "aria-invalid"
                    );
                }
            }
        );


        messageInput.addEventListener(
            "input",
            function () {

                if (
                    messageInput.value.trim()
                ) {

                    messageError.textContent =
                        "";

                    messageInput.classList.remove(
                        "input-error"
                    );

                    messageInput.removeAttribute(
                        "aria-invalid"
                    );
                }
            }
        );


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formIsValid =
                    validateContactForm();


                if (!formIsValid) {

                    const firstInvalidField =
                        contactForm.querySelector(
                            ".input-error"
                        );


                    if (firstInvalidField) {

                        firstInvalidField.focus();
                    }

                    return;
                }


                const customerData = {

                    name:
                        nameInput.value.trim(),

                    email:
                        emailInput.value.trim(),

                    phone:
                        phoneInput.value.trim(),

                    message:
                        messageInput.value.trim(),

                    customOrder:
                        customOrderInput.checked
                };


                localStorage.setItem(
                    "bookHavenCustomer",
                    JSON.stringify(
                        customerData
                    )
                );


                alert(
                    "Thank you for your message."
                );


                contactForm.reset();

                clearValidationErrors();
            }
        );


        contactForm.addEventListener(
            "reset",
            function () {

                clearValidationErrors();
            }
        );
    }

});