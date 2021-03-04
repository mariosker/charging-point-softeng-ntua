const express = require('express')
const router = express.Router()
const SessionService = require('../services/sessionService')

const myService = new SessionService()

router.get('/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to', async (req, res, next) => {
  try {
    const pointId = req.params.pointID
    const startDate = req.params.yyyymmdd_from
    const endDate = req.params.yyyymmdd_to

    const result = await myService.getSessionsPerPoint(pointId, startDate, endDate)

    res.send(result)
  } catch (err) {
    console.log(err)
  }
})

router.get('/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to', async (req, res, next) => {
  try {
    const stationId = req.params.stationID
    const startDate = req.params.yyyymmdd_from
    const endDate = req.params.yyyymmdd_to

    const result = await myService.getSessionsPerStation(stationId, startDate, endDate)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
})

router.get('/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to', async (req, res, next) => {
  try {
    const vehicleId = req.params.vehicleID
    const startDate = req.params.yyyymmdd_from
    const endDate = req.params.yyyymmdd_to

    const result = await myService.getSessionsPerEV(vehicleId, startDate, endDate)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
})

router.get('/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to', async (req, res, next) => {
  try {
    const providerId = req.params.providerID
    const startDate = req.params.yyyymmdd_from
    const endDate = req.params.yyyymmdd_to

    const result = await myService.getSessionsPerProvider(providerId, startDate, endDate)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router