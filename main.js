const KanadeIyerForm = {
  init() {
    const form = document.querySelector('.contact__form');
    if (!form) return;
    form.addEventListener('submit', (e) => this.handleSubmit(e, form));
  },

  handleSubmit(e, form) {
    e.preventDefault();

    const fields = {
      name: form.querySelector('#contact-name'),
      email: form.querySelector('#contact-email'),
      phone: form.querySelector('#contact-phone'),
      type: form.querySelector('#contact-type'),
      message: form.querySelector('#contact-message'),
    };

    if (!fields.name || !fields.email || !fields.type || !fields.message) return;

    const errors = this.validate(fields);
    this.renderErrors(fields, errors);

    if (Object.keys(errors).length === 0) {
      this.onSuccess(fields, form);
    } else {
      this.focusFirstError(errors, fields);
    }
  },

  validate(fields) {
    const errors = {};

    const name = (fields.name.value || '').trim();
    if (!name) {
      errors.name = 'Enter your name';
    } else if (name.length > 100) {
      errors.name = 'Name must be under 100 characters';
    }

    const email = (fields.email.value || '').trim();
    if (!email) {
      errors.email = 'Enter your email address';
    } else if (!this.isValidEmail(email)) {
      errors.email = 'Enter a valid email \u2014 e.g. name@firm.in';
    }

    const phone = (fields.phone.value || '').trim();
    if (phone && !this.isValidPhone(phone)) {
      errors.phone = 'Enter a valid phone number';
    }

    if (!fields.type.value) {
      errors.type = 'Select whether you are an individual or a business';
    }

    const message = (fields.message.value || '').trim();
    if (!message) {
      errors.message = 'Enter your message';
    } else if (message.length > 2000) {
      errors.message = 'Message must be under 2,000 characters';
    }

    return errors;
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone(phone) {
    return /^[\d\s+\-()]{7,20}$/.test(phone);
  },

  renderErrors(fields, errors) {
    document.querySelectorAll('.contact__field--error').forEach((el) => {
      el.classList.remove('contact__field--error');
    });

    document.querySelectorAll('.contact__error').forEach((el) => {
      el.textContent = '';
    });

    Object.keys(errors).forEach((key) => {
      const field = fields[key];
      if (!field) return;
      const wrapper = field.closest('.contact__field');
      if (!wrapper) return;
      wrapper.classList.add('contact__field--error');
      const errorEl = wrapper.querySelector('.contact__error');
      if (errorEl) errorEl.textContent = errors[key];
    });
  },

  focusFirstError(errors, fields) {
    const order = ['name', 'email', 'type', 'message', 'phone'];
    for (const key of order) {
      if (errors[key] && fields[key]) {
        fields[key].focus();
        break;
      }
    }
  },

  onSuccess(fields, form) {
    const payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      type: fields.type.value,
      message: fields.message.value.trim(),
    };
    console.log(payload);

    const msg = document.createElement('p');
    msg.className = 'contact__confirm';
    msg.textContent = 'Thank you. We respond within one working day.';
    form.replaceWith(msg);
  },
};

document.addEventListener('DOMContentLoaded', () => KanadeIyerForm.init());
