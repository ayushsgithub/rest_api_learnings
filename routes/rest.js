const express = require("express")
const router = express.Router()
const Subscriber = require("../models/rest")

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
})

router.get('/:id', getSubsciber, (req, res) => {
    res.json(res.subscriber)

})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.patch('/:id', getSubsciber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedSubs = await res.subscriber.save()
        res.json(updatedSubs)
    } catch (error) {
        res.status(400).json({message : error.message})
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const subs = Subscriber.findById(req.params.id)
        await subs.deleteOne()
        res.json({ message: 'Deleted Subscriber' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

async function getSubsciber(req, res, next) {
    let subscriber
    try {
      subscriber = await Subscriber.findById(req.params.id)
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.subscriber = subscriber
    next()
}


module.exports = router