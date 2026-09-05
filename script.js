// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL =
    'https://mjtiqhlmhbecususayjm.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
    'sb_publishable_RN_xA81V0RT09GDKdQ5GyA_WETDgcxg';


// ==========================================
// PREVENT SCRIPT FROM RUNNING TWICE
// ==========================================

if (!window.__submissionAppLoaded) {

    window.__submissionAppLoaded = true;


    // ==========================================
    // INITIALIZE SUPABASE
    // ==========================================

    window.demoSupabase =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );


    // ==========================================
    // PAGE LOADED
    // ==========================================

    document.addEventListener(
        'DOMContentLoaded',
        function () {

            // ==========================================
            // GET HTML ELEMENTS
            // ==========================================

            const form =
                document.getElementById(
                    'submission-form'
                );

            const submitBtn =
                document.getElementById(
                    'submit-btn'
                );

            const messageContainer =
                document.getElementById(
                    'message-container'
                );

            const usernameInput =
                document.getElementById(
                    'username'
                );

            const testValueInput =
                document.getElementById(
                    'test-value'
                );


            // ==========================================
            // CHECK ELEMENTS
            // ==========================================

            if (!form) {
                console.error(
                    'ERROR: submission-form not found.'
                );
                return;
            }

            if (!submitBtn) {
                console.error(
                    'ERROR: submit-btn not found.'
                );
                return;
            }

            if (!messageContainer) {
                console.error(
                    'ERROR: message-container not found.'
                );
                return;
            }

            if (!usernameInput) {
                console.error(
                    'ERROR: username input not found.'
                );
                return;
            }

            if (!testValueInput) {
                console.error(
                    'ERROR: test-value input not found.'
                );
                return;
            }


            // ==========================================
            // FORM SUBMISSION
            // ==========================================

            form.addEventListener(
                'submit',
                async function (event) {

                    event.preventDefault();


                    // ==========================================
                    // GET VALUES
                    // ==========================================

                    const username =
                        usernameInput.value.trim();

                    const testValue =
                        testValueInput.value.trim();


                    // ==========================================
                    // VALIDATION
                    // ==========================================

                    if (username === '') {

                        showMessage(
                            'error',
                            'Please enter a username.'
                        );

                        usernameInput.focus();

                        return;
                    }


                    if (testValue === '') {

                        showMessage(
                            'error',
                            'Please enter a test value.'
                        );

                        testValueInput.focus();

                        return;
                    }


                    // ==========================================
                    // LOADING
                    // ==========================================

                    setLoading(true);


                    try {

                        // ==========================================
                        // INSERT INTO SUPABASE
                        // ==========================================

                        const { error } =
                            await window.demoSupabase
                                .from('submissions')
                                .insert({
                                    username: username,
                                    test_value: testValue
                                });


                        // ==========================================
                        // CHECK ERROR
                        // ==========================================

                        if (error) {
                            throw error;
                        }


                        // ==========================================
                        // SUCCESS
                        // ==========================================

                        console.log(
                            'Successfully inserted into Supabase.'
                        );

                        form.reset();


                    } catch (error) {

                        // ==========================================
                        // ERROR
                        // ==========================================

                        console.error(
                            'Supabase submission error:',
                            error
                        );

                        showMessage(
                            'error',
                            'Failed to submit: ' +
                            error.message
                        );


                    } finally {

                        setLoading(false);

                    }

                }
            );


            // ==========================================
            // LOADING FUNCTION
            // ==========================================

            function setLoading(isLoading) {

                if (isLoading) {

                    submitBtn.disabled = true;

                    submitBtn.textContent =
                        'Submitting...';

                    messageContainer.classList.add(
                        'hidden'
                    );

                } else {

                    submitBtn.disabled = false;

                    submitBtn.textContent =
                        'Log in';

                }

            }


            // ==========================================
            // MESSAGE FUNCTION
            // ==========================================

            function showMessage(
                type,
                message
            ) {

                messageContainer.textContent =
                    message;

                messageContainer.className =
                    'message-container ' + type;

                messageContainer.classList.remove(
                    'hidden'
                );

            }

        }
    );

}