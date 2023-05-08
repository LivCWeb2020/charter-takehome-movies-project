export const getHeroImage = (id: string): string => {
    try {
      return require(`../images/${id}.jpeg`)
    } catch (error) {
      return require('../images/defaultImage.jpeg')
    }
  }