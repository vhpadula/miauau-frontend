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
                working: boolean,
                studying: boolean,
                unemployed: boolean,
                other: boolean,
                otherDescription: string
            },
            rent: {
                fixed: boolean,
                variable: boolean,
                doesNotHave: boolean
            }
        },
        residence: {
            type: {
                house: boolean,
                apartment: boolean,
                grange: boolean,
                other: boolean,
                otherDescription: string
            },
            own: boolean,
            rent: boolean,
            inherited: boolean
        }
    },
    housingDetails: {
        generalCharacteristics: {
            pool: boolean,
            poolWithProtection: boolean,
            fence: boolean,
            wall: boolean,
            windowsWithScreen: boolean,
            balconyWithScreen: boolean,
            willInstallScreens: boolean,
            yard: boolean,
            bigYard: boolean,
            safeHouse: boolean,
            flightRisk: boolean,
            condominiumRestriction: string
        }
    },
    coexistence: {
        generalCharacteristics: {
            animalWillStay: {
                inside: boolean,
                outside: boolean
            },
            possibilityOfMoving: boolean,
            livesAlone: boolean,
            livesWithWho: string,
            amountOfChildrenInTheHouse: number,
            childrensAge: boolean,
            alergicResidents: boolean,
            whatHappensInCaseOfAlergies: string,
            allResidentsAgree: boolean,
            numberOfAnimalsCurrently: number,
            castrated: boolean
        }
    },
    animals: {
        previous: {
            hadAnimalsBefore: boolean,
            whatHappenedToLastAnimal: {
                ranAway: boolean,
                ranOver: boolean,
                diedOfOldAge: boolean,
                diedByAccident: boolean,
                disappeared: boolean,
                donatedToSomeone: boolean,
                stolen: boolean,
                diedFromIllness: boolean,
                dateOfOccurrence: string
            }
        },
        adoptionMotivation: {
            company: boolean,
            guard_and_lookout: boolean,
            gift_someone: boolean,
            other: boolean,
            otherDescription: string
        },
        animalsOfInterest: {
            cat: boolean,
            dog: boolean
        }
    },
    interest: {
        dog: {
            sex: {
                female: boolean,
                male: boolean
            },
            size: {
                small: boolean,
                medium: boolean,
                big: boolean
            },
            ageGroup: {
                puppy: boolean,
                adult: boolean,
                elderly: boolean
            }
        },
        cat: {
            sex: {
                female: boolean,
                male: boolean
            },
            size: {
                small: boolean,
                medium: boolean,
                big: boolean
            },
            ageGroup: {
                puppy: boolean,
                adult: boolean,
                elderly: boolean
            }
        }
    },
    dailyCare: {
        responsibleForCare: string,
        responsibleForCareInCaseOfTravel: string,
        howWillEducate: string,
        hasPetCarrier: boolean,
        dailyWalks: number,
        timeAlone: {
            oneToThreeHours: boolean,
            threeToSevenHours: boolean,
            eightOrMoreHours: boolean
        },
        foodType: {
            animal: boolean,
            human: boolean,
            other: boolean,
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
        certaintyOfAdoption: boolean,
        awareOfTheImportanceOfNeuteringTheAnimal: boolean,
        agreesWithCastration: boolean,
        longTermCommitment: boolean,
        imageUse: boolean,
        monetaryContribution: boolean,
        houseVisit: boolean,
        notifyBeforeDonateToSomeoneElse: boolean,
        trueInformation: boolean,
        videoPresentation: boolean
    }
}