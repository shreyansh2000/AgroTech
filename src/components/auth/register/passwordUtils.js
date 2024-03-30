

export const validatePassword = (input) => {
    let newSuggestions = [];
    let satisfiedConditions = 0;

    if (input.length >= 8) {
        satisfiedConditions++;
    } else {
        newSuggestions.push('Password should be at least 8 characters long');
    }

    if (/\d/.test(input)) {
        satisfiedConditions++;
    } else {
        newSuggestions.push('Add at least one number');
    }

    if (/[A-Z]/.test(input)) {
        satisfiedConditions++;
    } else {
        newSuggestions.push('Include at least one uppercase letter');
    }

    if (/[a-z]/.test(input)) {
        satisfiedConditions++;
    } else {
        newSuggestions.push('Include at least one lowercase letter');
    }

    if (/[^A-Za-z0-9]/.test(input)) {
        satisfiedConditions++;
    } else {
        newSuggestions.push('Include at least one special character');
    }

    return {
        strength: getStrength(satisfiedConditions),
        suggestions: newSuggestions
    };
};

const getStrength = (satisfiedConditions) => {
    switch (satisfiedConditions) {
        case 5:
            return 'Very Strong';
        case 4:
            return 'Strong';
        case 3:
            return 'Moderate';
        case 2:
            return 'Weak';
        default:
            return 'Very Weak';
    }
};

export const getColorForStrength = (strength) => {
    switch (strength) {
        case 'Very Weak':
            return 'red';
        case 'Weak':
            return '#FF5F1F';
        case 'Moderate':
            return '#F4BB44';
        case 'Strong':
            return '#32CD32';
        case 'Very Strong':
            return 'green';
        default:
            return 'black';
    }
};

export const handleToggle = (field, state, setState) => {
    const newState = state === 'password' ? 'text' : 'password';
    setState(newState);
};
