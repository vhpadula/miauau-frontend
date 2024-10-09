export interface FormData {
    personalInformation: {
        identification: {
            name: string,
            cpf: string,
            rg: string,
            birthDate: string,
            phone: string,
            landline: string,
            email: string
        },
        address: {
            zipcode: string,
            street: string,
            number: string,
            complement: string,
            neighborhood: string
        }
    },
    socioeconomicProfile: {
        occupation: {
            profession: string,
            occupation: {
                working: boolean | undefined,
                studying: boolean | undefined,
                unemployed: boolean | undefined,
                other: boolean | undefined,
                otherDescription: string
            },
            rent: string
        },
        residence: {
            type: {
                house: boolean | undefined,
                apartment: boolean | undefined,
                grange: boolean | undefined,
                other: boolean | undefined,
                otherDescription: string
            },
            own: boolean | undefined,
            rent: boolean | undefined,
            inherited: boolean | undefined
        }
    },
    housingDetails: {
        generalCharacteristics: {
            pool: boolean | undefined,
            poolWithProtection: boolean | undefined,
            fence: boolean | undefined,
            wall: boolean | undefined,
            windowsWithScreen: boolean | undefined,
            balconyWithScreen: boolean | undefined,
            willInstallScreens: boolean | undefined,
            yard: string,
            safeHouse: boolean | undefined,
            flightRisk: boolean | undefined,
            condominiumRestriction: string
        }
    },
    coexistence: {
        generalCharacteristics: {
            animalWillStay: string,
            possibilityOfMoving: string,
            livesAlone: boolean | undefined,
            livesWithWho: string,
            amountOfChildrenInTheHouse: number,
            childrensAge: string,
            alergicResidents: boolean | undefined,
            whatHappensInCaseOfAlergies: string,
            allResidentsAgree: boolean | undefined,
            hasOtherAnimals: boolean | undefined,
            numberOfAnimalsCurrently: number,
            castrated: boolean | undefined
        }
    },
    animals: {
        previous: {
            hadAnimalsBefore: boolean | undefined,
            whatHappenedToLastAnimal: string,
            dateOfOccurrence: string
        },
        adoptionMotivation: string,
        adoptionMotivationDescription: string,
        animalsOfInterest: {
            cat: boolean | undefined,
            dog: boolean | undefined
        }
    },
    interest: {
        dog: {
            sex: {
                female: boolean | undefined,
                male: boolean | undefined
            },
            size: {
                small: boolean | undefined,
                medium: boolean | undefined,
                big: boolean | undefined
            },
            ageGroup: {
                puppy: boolean | undefined,
                adult: boolean | undefined,
                elderly: boolean | undefined
            }
        },
        cat: {
            sex: {
                female: boolean | undefined,
                male: boolean | undefined
            },
            size: {
                small: boolean | undefined,
                medium: boolean | undefined,
                big: boolean | undefined
            },
            ageGroup: {
                puppy: boolean | undefined,
                adult: boolean | undefined,
                elderly: boolean | undefined
            }
        }
    },
    dailyCare: {
        responsibleForCare: string,
        responsibleForCareInCaseOfTravel: string,
        howWillEducate: string,
        hasPetCarrier: boolean | undefined,
        dailyWalks: number,
        timeAlone: {
            oneToThreeHours: boolean | undefined,
            threeToSevenHours: boolean | undefined,
            eightOrMoreHours: boolean | undefined
        },
        foodType: {
            animal: boolean | undefined,
            human: boolean | undefined,
            other: boolean | undefined,
            otherDescription: string
        }
    },
    attitudesTowardsTheAnimal: {
        getsLost: string,
        getsSickOrAccident: string,
        hurtsYourChild: string,
        damagesValuableObject: string,
        peesOrPoopsInInappropriatePlace: string,
        doesThingsYouDontWant: string,
        ifYouHaveAChild: string
    },
    agreements: {
        certaintyOfAdoption: boolean | undefined,
        awareOfTheImportanceOfNeuteringTheAnimal: boolean | undefined,
        agreesWithCastration: boolean | undefined,
        longTermCommitment: boolean | undefined,
        imageUse: boolean | undefined,
        monetaryContribution: boolean | undefined,
        houseVisit: boolean | undefined,
        notifyBeforeDonateToSomeoneElse: boolean | undefined,
        trueInformation: boolean | undefined,
        videoPresentation: boolean | undefined
    }
}