document.addEventListener('DOMContentLoaded', () => {

    function addChangeListener(selector, targetClass) {
        const checkbox = document.querySelector(selector);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                toggleVisibility(targetClass);
            });
        }
    }
    

    function initializeFormTogglers() {
        addChangeListener('input[name="customs_form_enabled"]', '.customsFormDiv');
        addChangeListener('input[name="warehouse-use-origin-as-return"]', '.returnAddressDiv');
        addChangeListener('input[name="warehouse-save-for-reuse"]', '.nickNameDiv');
    }

    
    function newShipAddressToggler() {
        const shipFromSelectionDiv = document.querySelector('#shipFromSelection');
        if(shipFromSelectionDiv){
            const indexNumber = shipFromSelectionDiv.querySelector('.dd-selected').getAttribute('tab-index');
            const newShipAddress = document.querySelector('#new-ship-from-address-form');
            if(indexNumber === '1'){
                newShipAddress.classList.remove('d-none');
            }
            else{
                newShipAddress.classList.add('d-none');
            }
        }
    }
    
    function removeCustomItem(){
        const customItems = document.querySelector('.custom-items');
        if(customItems){
            customItems.addEventListener('click', function(e) {
                if(e.target.closest('.remove-customs-item') && customItems.querySelectorAll('.custom-item').length !== 1){
                    const itemToRemove = e.target.closest('.custom-item');
                    itemToRemove.remove();
                }
            });
        }
    }


    const customItemsContainer = document.querySelector('.custom-items');
    let totalItems = document.querySelectorAll('.custom-item').length;
    if(customItemsContainer){
        customItemsContainer.addEventListener('click', handleAddCustomItem);
    }

    function handleAddCustomItem(event) {
        if (event.target.classList.contains('add-customs-item')) {
            const customItem = event.target.closest('.custom-item');
            const clone = customItem.cloneNode(true);

            const inputs = clone.querySelectorAll('input');
            inputs.forEach(input => input.value = '');

            totalItems += 1;
            const upgradeLine = clone.querySelector('.upgradeLine');
            if (upgradeLine) {
                const anchor = document.createElement('a');
                anchor.classList.add('add-customs-item');
                anchor.href = 'javascript:void(0);';
                anchor.innerText = 'Add Line Item';

                const small = document.createElement('small');
                small.appendChild(anchor);

                upgradeLine.textContent = `Customs Line Item #${totalItems} `;
                upgradeLine.appendChild(small);
            }

            customItemsContainer.appendChild(clone);
        }
    }


    function togglerHeaderEventListener(){
        const togglerHeader = document.querySelector('.toggle-header');
        if(togglerHeader){
            togglerHeader.addEventListener('click', () => {
                toggleVisibility('.extraServiceDiv');
                togglerHeader.classList.toggle('active');
            });
        }
    }

    function addServiceSummary(){
        const checkboxes = document.querySelectorAll('.extraServiceDiv .toggle-checkbox');
        if(checkboxes){
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', () => {
                    const checkedValues = Array.from(checkboxes)
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => checkbox.getAttribute('check-value'));
                    const smallElement = document.querySelector('.extra-service-summary');
                    if(smallElement){
                        if (checkedValues.length > 0) {
                            const result = checkedValues.join(', ') + ' activated';
                            smallElement.textContent = result;
                        }
                        else{
                            smallElement.textContent = 'No extra services activated';
                        }
                    }
                    if(checkbox.getAttribute('id') === 'delivery_confirmation_flag'){
                        toggleVisibility('#signatureConfirmationSelection');
                    }
                    if(checkbox.getAttribute('id') === 'insured_value_flag'){
                        toggleVisibility('.insuredFlagDiv');
                    }
                });
            });
        }
    }

    function selectionClickEventHandler(){
        const selectionDivs = document.querySelectorAll('.dd-select');
        if(selectionDivs){
            selectionDivs.forEach((selectionDiv) => {
                const selection = selectionDiv.querySelector('.dd-selected');
                if(selection){
                    selection.addEventListener('click', () => {
                        selectionDiv.classList.toggle('active');
                    });
                }
            });
        }
    }

    function setSelectedOptionValue(id, indexValue, textValue, descValue, imgSource='') {
        const selectionDiv = document.querySelector(`${id} .dd-select`);
        const selection = selectionDiv.querySelector('.dd-selected');
    
        if (!selection) return;
    
        selection.querySelector('.dd-selected-text').textContent = textValue;
        selection.querySelector('.dd-selected-desc').textContent = descValue;
        selection.setAttribute('tab-index', indexValue);
    
        if (arguments.length === 5 && imgSource) {
            const imgElement = selection.querySelector('.dd-selected-image');
            if (imgElement) {
                imgElement.setAttribute('src', imgSource);
            }
        }
    }


    function initializeOptionClickHandlers(dropdownConfigs){
        dropdownConfigs.forEach(config => {
            const optionsList = document.querySelectorAll(`${config.selector} .dd-options .dd-option`);
            if(optionsList){
                optionsList.forEach(option => {
                    option.addEventListener('click', () => handleOptionClick(option, config.selector, config.hasImage));
                });
            }
        });
    }


    function handleOptionClick(option, selector, hasImage){
        const index = option.getAttribute('tab-index');
        const ddText = option.querySelector('.dd-option-text').textContent;
        const ddDesc = option.querySelector('.dd-option-desc').textContent;
        let imageSrc = '';

        if (hasImage) {
            imageSrc = option.querySelector('.dd-option-image').getAttribute('src');
        }

        setSelectedOptionValue(selector, index, ddText, ddDesc, imageSrc);

        const selection = option.closest('.dd-select');
        selection.classList.remove('active');
        hideSelectedIndexOption();
        newShipAddressToggler();
    }


    function selectionCloseEvent(){
        document.addEventListener('click', (e) => {
            const selectionDivs = document.querySelectorAll('.dd-select');
            selectionDivs.forEach((selectionDiv) => {
                if(!selectionDiv.contains(e.target)){
                    selectionDiv.classList.remove('active');
                }
            });
        });
    }


    function hideSelectedIndexOption(){
        const selectionContainers = document.querySelectorAll('.dd-container');
        if(selectionContainers){
            selectionContainers.forEach((selectionContainer) => {
                const selectedOption = selectionContainer.querySelector('.dd-select .dd-selected');
                if(selectedOption){
                    const index = selectedOption.getAttribute('tab-index');
                    const optionsList = selectionContainer.querySelectorAll('.dd-options .dd-option');
                    if(optionsList){
                        optionsList.forEach((option) => {
                            if(option.getAttribute('tab-index') === index){
                                option.classList.add('d-none');
                            }
                            else{
                                option.classList.remove('d-none');
                            }
                        });
                    }
                }
            });
        }
    }

    function savedPackageToggler() {
        const checkbox = document.querySelector('.savePackage_flag');
        if(checkbox){
            checkbox.addEventListener('change', () => {
                toggleVisibility('.savePackageDiv');
            });
        }
    }
    
    function hazardousStampToggler() {
        const checkbox = document.querySelector('.hazardous_flag');
        if(checkbox){
            checkbox.addEventListener('change', () => {
                toggleVisibility('.alertDiv');
            });
        }
    }


    function rubberStampToggler(){
        const checkbox = document.querySelector('.js-rubberstamp_flag');
        if(checkbox){
            checkbox.addEventListener('change', () => {
                toggleVisibility('.rubberStampDiv');
            });
        }
    }


    //FUNCTION THAT HANDLE VISIBILITY OF THE COPYPASTE TEXTAREA DIV
    function toggleVisibility(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle('d-none');
        }
    }
    
    //FUNCTION TO HANDLE COPYPASTE TEXTAREA CLICK BUTTON EVENT
    function copyPasteEventToggler() {
        const copyPasteButton = document.querySelector('#copypaste-link');
        if (copyPasteButton) {
            copyPasteButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleVisibility('.autoForm');
            });
        }
    }

    //FUNCTION TO HANDLE ADDRESS AUTOFILL FUNCTIONALITY
    function autoFillAddress() {
        const textArea = document.querySelector('textarea[name="copypaste"]');
        if (!textArea) return;
    
        textArea.addEventListener('input', () => {
            const form = document.querySelector('#originalForm');
            if (!form) return;
    
            // CLEAR ALL FIELDS INITIALLY
            const fieldsToClear = ['#name', '#address', '#aptName', '#city', '#state', '#zipCode'];
            fieldsToClear.forEach(selector => form.querySelector(selector).value = '');
    
            const addressLines = textArea.value.split('\n').map(line => line.trim()).filter(line => line);
    
            if (!addressLines.length) return;
    
            let currentIndex = 0;
    
            // CHECK IF THE FIRST LINE IS LIKELY A NAME
            if (!/^\d/.test(addressLines[0])) {
                form.querySelector('#name').value = addressLines[currentIndex++];
            }
    
            if (addressLines.length > currentIndex) {
                form.querySelector('#address').value = addressLines[currentIndex++];
            }
    
            if (addressLines.length > currentIndex) {
                const [city, stateZip] = addressLines[currentIndex].split(',');
                if (city && stateZip) {
                    form.querySelector('#city').value = city.trim();
    
                    const [state, zipCode] = stateZip.trim().split(' ');
                    if (state && zipCode) {
                        form.querySelector('#state').value = state;
                        form.querySelector('#zipCode').value = zipCode;
                    }
                }
                currentIndex++;
            }
    
            if (addressLines.length > currentIndex) {
                form.querySelector('#aptName').value = addressLines[currentIndex];
            }
    
            dynamicLabelHandler();
        });
    }
    
    
    

    //FUNCTION TO HANDLE THE LABEL OF THE DYNAMIC INPUT FIELD WHICH DON'T HAVE PLACEHOLDER'S BUT WANT PLACEHOLDER EFFECT 
    function dynamicLabelHandler() {
        const inputFields = document.querySelectorAll('.form-horizontal .form-control.dynamic');
        if (inputFields) {
            inputFields.forEach((input) => {
                const dynamicLabel = input.nextElementSibling;

                if(input.value){
                    if(dynamicLabel){
                        dynamicLabel.classList.add('active');
                    }
                }

                input.addEventListener('focus', () => {
                    if (dynamicLabel) {
                        dynamicLabel.classList.add('active');
                    }
                });
                input.addEventListener('blur', () => {
                    if (dynamicLabel && !input.value) {
                        dynamicLabel.classList.remove('active');
                    }
                });
            });
        }
    }
    

    function themeToggler(){
        const toggleButton = document.querySelector('.themeToggler');
        if(toggleButton){
            toggleButton.addEventListener('click', () => {
                toggleButton.classList.toggle('active');
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                }
                else{
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
            });
        }
    }

    // INITIALIZING EVENT LISTENERS
    copyPasteEventToggler();
    dynamicLabelHandler();
    rubberStampToggler();
    hazardousStampToggler();
    savedPackageToggler();
    hideSelectedIndexOption();
    selectionClickEventHandler();
    selectionCloseEvent();
    addServiceSummary();
    togglerHeaderEventListener();
    removeCustomItem();
    initializeFormTogglers();
    initializeOptionClickHandlers([
        {
            selector: '#packageContentTypeSelection',
            hasImage: false
        },
        {
            selector: '#signatureConfirmationSelection',
            hasImage: false
        },
        {
            selector: '#packagingTypeSelection',
            hasImage: true
        },
        {
            selector: '#shipFromSelection',
            hasImage: false
        }
    ]);
    themeToggler();
    autoFillAddress();
});