const form = document.querySelector(`.feedback__form`);

if (form) {
	const successModal = document.querySelector(`.modal--success`);
	const failureModal = document.querySelector(`.modal--failure`);
	const failureBtn = failureModal.querySelector(`.modal--failure .modal__button`);
	const successBtn = successModal.querySelector(`.modal--success .modal__button`);
	const overlay = document.querySelector(`.overlay`);
	const formFields = Array.from(form.elements);
	const links = Array.from(document.querySelectorAll(`a`));
	let isValid = true;

	const validateForm = () => {
		const invalidFields = [];

		formFields.forEach((field) => {
			field.style.outline = `none`;

			if (field.hasAttribute(`data-required`) && !field.value) {
				field.style.outline = `1px solid red`;
				invalidFields.push(field);
			}
		});

		invalidFields.forEach((field) => {
			field.addEventListener(`focus`, function(evt) {
				evt.target.style.outline = `none`;
			});
		});

		isValid = (!invalidFields.length)
			? true
			: false;
	};

	const windowEscDownHandler = (evt) => {
		if (evt.code === `Escape`) {
			isValid
				? closeModal(successModal)
				: closeModal(failureModal);
		}
	};

	const showModal = (modal) => {
		overlay.classList.remove(`hidden`);
		modal.classList.remove(`hidden`);
		document.body.style.overflow = `hidden`;

		links.forEach((link) => {
			link.tabIndex = !link.classList.contains(`modal__button`)
				? -1
				: 0;
		});

		formFields.forEach((field) => {
			field.disabled = true;
		});

		window.addEventListener(`keydown`, windowEscDownHandler);
	};

	const closeModal = (modal) => {
		overlay.classList.add(`hidden`);
		modal.classList.add(`hidden`);
		document.body.style.overflow = `visible`;

		links.forEach((link) => {
			link.tabIndex = 0;
		});

		formFields.forEach((field) => {
			field.disabled = false;
			field.value = ``;
		});

		window.removeEventListener(`keydown`, windowEscDownHandler);
	};

	form.addEventListener(`submit`, function(evt) {
		evt.preventDefault();
		validateForm();

		isValid
			? showModal(successModal)
			: showModal(failureModal);
	});

	failureBtn.addEventListener(`click`, () => closeModal(failureModal));

	successBtn.addEventListener(`click`, () => closeModal(successModal));
}
