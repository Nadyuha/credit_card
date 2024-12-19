import 'babel-polyfill';
import {el, setAttr, setChildren} from 'redom';
import JustValidate from 'just-validate';
import IMask from 'imask';
import moment from 'moment';
import {
    isValid,
    getCreditCardNameByNumber,
    } from 'creditcard.js';

/*img card*/
import visa from './assets/img/visa.svg';
import amex from './assets/img/amex.svg';
import diners from './assets/img/diners.svg';
import discover from './assets/img/discover.svg';
import elo from './assets/img/elo.svg';
import goodcard from './assets/img/goodcard.svg';
import hipercard from './assets/img/hipercard.svg';
import mastercard from './assets/img/mastercard.svg';
//
import './style.scss';

// const imgPay = {
//   'Visa': visa,
//   'Amex': amex,
//   'Diners': diners,
//   'Discover': discover,
//   'elo': elo,
//   'Goodcard': goodcard,
//   'Hipercard': hipercard,
//   'Mastercard': mastercard,
// }

const container = el('div');

setAttr(container, {
    style:{ display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            //width: '100%',
            height: '100%',
            inset: '0',
            alignItems: 'center',
            padding: '150px 50px'},
})

const title = el('h1', 'Форма оплаты');
setAttr(title, {
    style: {
        fontSize: '40px',
        color: '#708090',
        textAlign: 'center',
        marginBottom: '25px'
    }
})


const containerTitle = el('div');

setAttr(containerTitle, {
    id: 'titleContainer',
    style:{ display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
})

const h1 = el('h2','Введите данные карты');
setAttr(h1, {
    id: 'title',
    style: {
        color: 'grey',
        textAlign: 'center',
        marginBottom: '10px'
    }
})

setChildren(containerTitle, h1)

const form = el('form');
setAttr(form, {
    id: 'form',
    class: 'form',
    action: '#',
    style: {
        display: 'flex',
        width: '500px',
        minHeight: '300px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'lightgrey',
        border: '1px solid lightblue',
        borderRadius: '5px',
    }
})
///
const labelNumber = el('label');
setAttr(labelNumber, {
    for: 'name',
    style: {
        width: '100%',
        textAlign: 'center',
        position: 'relative',
    }
})
const inputNumber = el('input');
IMask(inputNumber, {
    mask: '#000 #000 #000 #000',
    definitions: {
        '#': /[0-9]/
    }
});
setAttr(inputNumber, {
    id: 'name',
    name: 'name',
    autocomplete: 'off',
    placeholder: 'номер карты',
    style: {
        padding: '10px',
        marginBottom: '15px',
        width: '90%',
        border: '1px solid lightblue',
        borderRadius: '5px',
        fontSize: '16px'
    }
})

setChildren(labelNumber, inputNumber);
///
const labelDate = el('label');
setAttr(labelDate, {
    for: 'date',
    style: {
        width: '100%',
        textAlign: 'center',
        position: 'relative',
    }
})

const inputDate = el('input');
IMask(inputDate, {
    mask: 'MM/YYYY',
    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: moment().format('y').slice(-2),
            to: 39,
            maxLength: 2,
        },
        MM: {
            mask: IMask.MaskedRange,
            from: moment().format('MM'),
            to: 12,
            maxLength: 2,
        },
    }
});

setAttr(inputDate, {
    id: 'date',
    name: 'date',
    autocomplete: 'off',
    placeholder: 'дата окончания действия карты(ММ/ГГ)',
    style: {
        padding: '10px',
        marginBottom: '15px',
        width: '90%',
        border: '1px solid lightblue',
        borderRadius: '5px',
        fontSize: '16px'
    }
})
setChildren(labelDate, inputDate);
///
const labelSecurity = el('label');
setAttr(labelSecurity, {
    for: 'security',
    style: {
        width: '100%',
        textAlign: 'center',
        position: 'relative'
    }
})
const inputSecurity = el('input');
IMask(inputSecurity, {
    mask: '#00',
    definitions: {
        '#': /[0-9]/
    }
})
setAttr(inputSecurity, {
    id: 'security',
    name: 'security',
    autocomplete: 'off',
    max: '3',
    placeholder: 'CVC/CVV(3 цифры на обороте карты)',
    style: {
        padding: '10px',
        marginBottom: '15px',
        width: '90%',
        border: '1px solid lightblue',
        borderRadius: '5px',
        fontSize: '16px'
    }
})
setChildren(labelSecurity, inputSecurity);
///
const labelEmail = el('label');
setAttr(labelEmail, {
    for: 'email',
    style: {
        width: '100%',
        textAlign: 'center',
        position: 'relative',
    }
})
const inputEmail = el('input');
IMask(inputEmail, {
    mask: '#######################',
    definitions: {
        '#': /[0-9,a-z,A-Z,\-\(\)\.\^\+,@]/
    }
})
setAttr(inputEmail, {
    type: 'email',
    name: 'email',
    id: 'email',
    autocomplete: 'off',
    placeholder: 'email для отправки онлайн-чека',
    style: {
        padding: '10px',
        marginBottom: '10px',
        width: '90%',
        border: '1px solid lightblue',
        borderRadius: '5px',
        fontSize: '16px'
    }
})
setChildren(labelEmail, inputEmail);

const button = el('button', 'Оплатить');
setAttr(button, {
    id: 'btn',
    type: 'submit',
    style: {
        padding: '10px',
        marginBottom: '10px',
        width: '30%',
        border: '1px solid lightblue',
        borderRadius: '5px',
        background: 'white',
        cursor: 'pointer',
        fontSize: '16px'
    }
})

setChildren(window.document.body, container);
setChildren(container, [title,form])
setChildren(form, [containerTitle,labelNumber,labelDate, labelSecurity, labelEmail, button]);


    const validate = new JustValidate('#form', {
        errorFieldCssClass: 'is-invalid',
        },
    );
    validate
        .addField('#name', [
            {
                errorMessage: 'Введите номер карты',
                rule: 'required',
            },
        ])
        .addField('#date', [{
            errorMessage: 'дата окончания действия карты(ММ/ГГ)',
            rule: 'required',
        },
            {
            errorMessage: 'ММ/ГГ',
            rule: 'minLength',
            value: 5,
            },
        ])
        .addField('#security', [{
                errorMessage: '3 цифры с обратной стороны карты (CVC/CVV)',
                rule: 'minLength',
                value: 3,
            },
            {
                errorMessage: 'CVC/CVV',
                rule: 'required',
            }
        ])
        .addField('#email', [{
                errorMessage: 'Введите email',
                rule: 'required',
            },
            {
                errorMessage: 'Неверный формат email(@)',
                validator: (value) => {
                    return value.includes('@') || value.includes('/a-z/') || value.includes('/A-Z/')
                },
            },
        ])

    function paySistem(value, el, container) {
      if (getCreditCardNameByNumber(value) === 'Discover') {
        el.classList.add('img-container');
        el.setAttribute('src', discover);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Amex') {
        el.classList.add('img-container');
        el.setAttribute('src', amex);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Diners') {
        el.classList.add('img-container');
        el.setAttribute('src', diners);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Elo') {
        el.classList.add('img-container');
        el.setAttribute('src', elo);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Goodcard') {
        el.classList.add('img-container');
        el.setAttribute('src', goodcard);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Hipercard') {
        el.classList.add('img-container');
        el.setAttribute('src', hipercard);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Mastercard') {
        el.classList.add('img-container');
        el.setAttribute('src', mastercard);
        container.append(el);
      }
      if (getCreditCardNameByNumber(value) === 'Visa') {
        el.classList.add('img-container');
        el.setAttribute('src', visa);
        container.append(el);
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('btn');
        const inputNumber = document.getElementById('name');
        const inputDate = document.getElementById('date');
        const inputSecurity = document.getElementById('security');
        const inputEmail = document.getElementById('email');
        const typeCard = document.createElement('img');
        const error = document.createElement('div');
        const label = document.querySelector('[for="name"]');
        const titleContainer = document.getElementById('titleContainer');

        error.textContent = 'Неверный номер карты';
        error.classList.add('just-validate-error-label');
        error.style.color = '#B81111';
        typeCard.style.textAlign = 'center';

        inputNumber.addEventListener('change', (e) => {
            if (isValid(inputNumber.value) !== false || inputNumber.value === '') {
              error.remove();
              typeCard.remove();
            } else {
              label.append(error)
            }
        })
        inputNumber.addEventListener('input', (e) => {
            console.log(isValid(inputNumber.value))
            if (isValid(inputNumber.value) === false) {
                if (getCreditCardNameByNumber(inputNumber.value) === 'Credit card is invalid!') {
                    typeCard.textContent = '';
                    titleContainer.append(typeCard);
                }
              }
              // typeCard.classList.add('img-container');
              // typeCard.setAttribute('src', imgPay[getCreditCardNameByNumber(inputNumber.value)]);
              // titleContainer.append(typeCard);
              paySistem(inputNumber.value, typeCard, titleContainer);
        });

        if (inputNumber.value === '' && inputDate.value === '' && inputSecurity.value === '' && inputEmail.value === '') btn.disabled = true;

        let obj = {};

        function isValidField() {
            if (obj.name === true && obj.date === true && obj.security === true && obj.email === true && isValid(inputNumber.value) != false) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        }

        inputNumber.addEventListener('blur', (e) => {
            validate
                .revalidateField('#name').then(isValid => {
                    obj.name = isValid;
                    isValidField();
                })
        });
        inputDate.addEventListener('blur', (e) => {
            validate
                .revalidateField('#date').then(isValid => {
                    obj.date = isValid;
                    isValidField();
                })
        });
        inputSecurity.addEventListener('blur', (e) => {
            validate
                .revalidateField('#security').then(isValid => {
                    obj.security = isValid;
                    isValidField();
                })
        });
        inputEmail.addEventListener('blur', (e) => {
            validate
                .revalidateField('#email').then(isValid => {
                    obj.email = isValid;
                    isValidField();
                })
        });
    })
