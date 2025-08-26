// Donate Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const typeButtons = document.querySelectorAll('.type-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountDiv = document.querySelector('.custom-amount');
    const customAmountInput = document.getElementById('customAmount');
    const tributeCheckbox = document.getElementById('tribute');
    const tributeInfo = document.querySelector('.tribute-info');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardInfo = document.getElementById('cardInfo');
    
    // State
    let donationType = 'once';
    let donationAmount = 50;
    
    // Donation Type Toggle
    typeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            typeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            donationType = this.dataset.type;
            updateSummary();
        });
    });
    
    // Amount Selection
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.amount === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                donationAmount = parseInt(this.dataset.amount);
                updateSummary();
            }
        });
    });
    
    // Custom Amount Input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            donationAmount = parseInt(this.value) || 0;
            updateSummary();
        });
    }
    
    // Tribute Gift Toggle
    if (tributeCheckbox) {
        tributeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                tributeInfo.style.display = 'block';
            } else {
                tributeInfo.style.display = 'none';
            }
        });
    }
    
    // Payment Method Toggle
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'card') {
                cardInfo.style.display = 'block';
            } else {
                cardInfo.style.display = 'none';
            }
        });
    });
    
    // Update Summary
    function updateSummary() {
        const amountElement = document.getElementById('summaryAmount');
        const frequencyElement = document.getElementById('summaryFrequency');
        const totalElement = document.getElementById('summaryTotal');
        
        if (amountElement) {
            amountElement.textContent = `$${donationAmount}`;
        }
        
        if (frequencyElement) {
            frequencyElement.textContent = donationType === 'monthly' ? 'Monthly' : 'One-Time';
        }
        
        if (totalElement) {
            totalElement.textContent = `$${donationAmount}`;
        }
    }
    
    // Format Card Number
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format Expiry Date
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Handle Form Submission
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Add donation details
            data.amount = donationAmount;
            data.frequency = donationType;
            
            // Show processing message
            const submitBtn = this.querySelector('.btn-donate');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                // Show success message
                submitBtn.textContent = 'Thank You! ✓';
                submitBtn.style.background = 'var(--color-green)';
                
                // Show confirmation modal or redirect
                setTimeout(() => {
                    alert(`Thank you for your generous donation of $${donationAmount}! You will receive a confirmation email shortly.`);
                    
                    // Reset form
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    // Reset amount selection
                    amountButtons.forEach(b => b.classList.remove('active'));
                    document.querySelector('[data-amount="50"]')?.classList.add('active');
                    donationAmount = 50;
                    updateSummary();
                }, 2000);
            }, 2000);
        });
    }
    
    // Initialize
    updateSummary();
});