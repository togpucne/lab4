const validateDrug = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;
    const errors = [];

    if (!name || name.length <= 5) {
        errors.push('Name must be longer than 5 characters');
    }

    const dosageRegex = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosage || !dosageRegex.test(dosage)) {
        errors.push('Dosage must follow the format: XX-morning,XX-afternoon,XX-night where X is digit');
    }

    if (!card || card <= 1000) {
        errors.push('Card must be more than 1000');
    }

    if (!pack || pack <= 0) {
        errors.push('Pack must be more than 0');
    }

    if (!perDay || perDay <= 0 || perDay >= 90) {
        errors.push('PerDay must be more than 0 and less than 90');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateDrug;
