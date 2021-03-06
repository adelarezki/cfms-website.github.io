import Utils from '../utils';

export default class RegistrationController {
    constructor({ authenticationService, UserModel }) {
        this.auth = authenticationService;
        this.Model = UserModel;
        this.bindListeners();
    }

    bindListeners() {
        document.getElementById('signup-button').addEventListener('click', this.register.bind(this), false);
    }
    
    register() {
        let utils = new Utils();
        var email = document.getElementById('account-email').value;
        var password = document.getElementById('account-password-first').value;
        var passwordAgain = document.getElementById('account-password-second').value;
        var authenticationCode = document.getElementById('account-authentication-code').value;
        if (password !== passwordAgain) return utils.showAlert("Passwords do not match", "Please try again.");
        if (email.length < 4) return utils.showAlert("Enter an Email Address", "Please enter an email address.");
        if (password.length < 7) return utils.showAlert("Weak Password", "Please ensure that your password is at least 7 characters.");
        let profile = {
            email: email,
            password: password,
            user_metadata: {
                auth_code: authenticationCode,
                given_name: document.getElementById('account-first-name').value,
                family_name: document.getElementById('account-last-name').value,
                medicalSchool: document.getElementById('account-medical-school').value,
                graduationYear: document.getElementById('account-graduation-year').value
            }
        };
        this.auth.register(new this.Model(JSON.stringify(profile)).toRow());
    }
}