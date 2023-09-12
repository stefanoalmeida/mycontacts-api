const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    // Listar todos os registros
    const categories = await CategoriesRepository.findAll()
    response.json(categories)
  }

  async show(request, response) {
    // Obter UM registro
    const {id} = request.params
    const category = await CategoriesRepository.findById(id)

    if (!category) {
      return response.status(404).json({error: 'Category not found!'})
    }

    response.json(category)
  }

  async store(request, response) {
    // Criar um novo registro
    const {name} = request.body
    const categoryExists = await CategoriesRepository.findByName(name)

    if (!name) {
      return response.status(400).json({error: 'Name is required'})
    }

    if (categoryExists) {
      return response.status(400).json({error: 'This category is already in use'})
    }

    const category = await CategoriesRepository.create({
      name
    })

    response.json(category)
  }

  async update(request, response) {
    // Editar um registro
    const {id} = request.params
    const {name} = request.body

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists) {
      return response.status(404).json({error: 'Category not found!'})
    }

    if (!name) {
      return response.status(400).json({error: 'Name is required'})
    }

    const nameExists = await CategoriesRepository.findByName(name)

    if(nameExists && emailExists.id !== id) {
      return response.status(400).json({error: 'This name is already in use!'})
    }

    const category = await CategoriesRepository.update(id, {
      name
    })

    response.json(category)
  }

  async delete(request, response) {
    // Deletar um registro
    const {id} = request.params

    await CategoriesRepository.delete(id)

    response.sendStatus(204)
  }
}

module.exports = new CategoryController()
