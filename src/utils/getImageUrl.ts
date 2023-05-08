export const getSmallImage = (id: string): string => {
    try {
      return require(`../images/small/${id}.jpeg`)
    } catch (error) {
      return require('../images/small/defaultImage.jpeg')
    }
  }
  
  export const getHeroImage = (id: string): string => {
    try {
      return require(`../images/hero/${id}.jpeg`)
    } catch (error) {
      return require('../images/hero/defaultImage.jpeg')
    }
  }