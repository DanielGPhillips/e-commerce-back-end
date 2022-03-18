const router = require('express').Router();
const { json } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['product_name']
      }],
    });
    res.status(200).json(allTagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['product_name']
      }],
    });

    if (!tagData) {
      return res.status(404).json({ message: 'No tag found matching that id' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const product = await Tag.update(req.body, {
      where: { id: req.params.id, },
    })
    if (product) {
      res.status(200).json({ message: 'Tag name updated successfully' });
    } else {
      res.status(500).json({ message: 'No Tag with that ID found' });
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    if (tag) {
      res.status(200).json({ message: 'Tag has been deleted' });
    } else {
      res.status(404)/json({ message: 'No Tag with that ID found'});
    }
  } catch (err) {
    res.status(500).json(err) 
  }
});

module.exports = router;
