document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('pay-btn');
    const paymentCard = document.querySelector('.payment-card');
    const progressBar = document.querySelector('.progress');
    const paymentStatus = document.getElementById('paymentStatus');
    const orderId = document.getElementById('orderId');
    let processingPayment = false;
    // Simulated order creation
    setTimeout(() => {
        orderId.textContent = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        progressBar.style.width = '30%';
    }, 1000);
    payButton.addEventListener('click', async function() {
        if (processingPayment) return;
        
        try {
            processingPayment = true;
            paymentCard.classList.add('processing');
            progressBar.style.width = '60%';
            paymentStatus.textContent = 'Processing...';
            
            const response = await fetch('/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const order = await response.json();
            
            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID', // Replace with actual key
                amount: order.amount,
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Purchase Description',
                order_id: order.id,
                handler: async function(response) {
                    try {
                        progressBar.style.width = '90%';
                        
                        const verificationResponse = await fetch('/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        
                        const verification = await verificationResponse.json();
                        
                        if (verification.status === 'Payment successful') {
                            paymentSuccess();
                        } else {
                            paymentError('Payment verification failed');
                        }
                    } catch (error) {
                        paymentError('Verification failed');
                    }
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com'
                },
                theme: {
                    color: '#667eea'
                }
            };
            const rzp = new Razorpay(options);
            rzp.open();
            
            rzp.on('payment.failed', function(response) {
                paymentError('Payment failed');
            });
        } catch (error) {
            paymentError('Failed to create order');
        }
    });
    function paymentSuccess() {
        processingPayment = false;
        paymentCard.classList.remove('processing');
        paymentCard.classList.add('success');
        progressBar.style.width = '100%';
        paymentStatus.textContent = 'Payment Successful';
        payButton.innerHTML = '<span class="button-text">Paid</span> ✓';
        
        // Add success animation
        payButton.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        paymentCard.style.animation = 'pulse 0.5s ease';
    }
    function paymentError(message) {
        processingPayment = false;
        paymentCard.classList.remove('processing');
        paymentCard.classList.add('error');
        progressBar.style.width = '100%';
        paymentStatus.textContent = message;
        
        // Reset after delay
        setTimeout(() => {
            paymentCard.classList.remove('error');
            progressBar.style.width = '30%';
            paymentStatus.textContent = 'Pending';
        }, 3000);
    }
    // Add hover animation for payment card
    paymentCard.addEventListener('mousemove', function(e) {
        const rect = paymentCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    paymentCard.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });