const { models: { User, MealPlan}} = require('data')
const { validators: { validateId} , errors: { NotFoundError, AuthError }} = require('commons')

function retrieveMealPlan(nutritionistId, patientId, mealPlanId){   
    validateId(nutritionistId, 'nutritionist id')
    validateId(nutritionistId, 'patient id')
    validateId(mealPlanId, 'mealPlan id')

    return Promise.all([User.findById(nutritionistId).lean(),User.findById(patientId).lean(), MealPlan.findById(mealPlanId).lean()])
        .then(([nutritionist, patient, mealPlan]) => {
        if (!nutritionist) throw new NotFoundError(`nutritionist with id ${nutritionistId} not found`)
        if (!patient) throw new NotFoundError(`patient with id ${patientId} not found`)
        if (!mealPlan) throw new NotFoundError(`meal plan with id ${meaplanlId} not found`)

        if (nutritionist.role !== User.NUTRITIONIST)
            throw new AuthError(`cannot retrieve meal, user with id ${nutritionistId} is not an nutritionist`)
        
        if (patient.nutritionist.toString() !== nutritionistId)
            throw new AuthError(`patient with id ${patientId} does not belong to nutritionist with id ${nutritionistId}`)

        if (mealPlan.patient.toString() !== patientId)
            throw new AuthError(`meal with id ${mealId} does not belong to nutritionist with id ${nutritionistId}`)

            mealPlan.id = mealPlan._id.toString()
            delete mealPlan.__v

            return mealPlan
    
    
    })
}

module.exports = retrieveMealPlan