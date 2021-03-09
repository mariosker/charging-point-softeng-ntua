/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/node-builtins */

const {expect} = require('@oclif/test')
const {exec} = require('child_process')
const util = require('util')
const execProm = util.promisify(exec)
const Station = require('../../../../back-end/api/models/Station')
const User = require('../../../../back-end/api/models/User')
const Point = require('../../../../back-end/api/models/Point')
const Vehicle = require('../../../../back-end/api/models/Vehicle')

require('../testserver')

async function runShellCommand(command) {
  let result
  try {
    result = await execProm(command)
  } catch (error) {
    result = error
  }
  if (Error[Symbol.hasInstance](result))
    return

  return result
}

describe('sessions', () => {
  describe('sessionsPerEV',  () => {
    it('it finds a car in the db', async () => {
      const car = await Vehicle.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerEV --ev ${car._id} --datefrom 20160101 --dateto 20220101`)
      expect(res.stdout).to.contain(`VehicleID: '${car._id}'`)
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('TotalEnergyConsumed')
      expect(res.stdout).to.contain('NumberOfVisitedPoints')
      expect(res.stdout).to.contain('NumberOfVehicleChargingSessions')
      expect(res.stdout).to.contain('VehicleChargingSessionsList')
    })
  })
  describe('sessionsPerPoint',  () => {
    it('it finds a point in the db', async () => {
      const point = await Point.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerPoint --point ${point._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`Point: '${point._id}'`)
      expect(res.stdout).to.contain('PointOperator')
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('NumberOfChargingSessions')
      expect(res.stdout).to.contain('ChargingSessionsList')
    })
  })
  describe('sessionsPerProvider',  () => {
    it('it finds an electrical company operator in the db', async () => {
      const user = await User.findOne({account_type: 'electricalCompanyOperator'})
      const res = await runShellCommand(`ev_group32 sessionsPerProvider --provider ${user._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`ProviderID: '${user._id}'`)
      expect(res.stdout).to.contain('ProviderName')
      expect(res.stdout).to.contain('SessionsSummaryList')
    })
  })
  describe('sessionsPerStation',  () => {
    it('it finds a station in the db', async () => {
      const station = await Station.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerStation --station ${station._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`StationID: '${station._id}'`)
      expect(res.stdout).to.contain('Operator')
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('TotalEnergyDelivered')
      expect(res.stdout).to.contain('NumberOfChargingSessions')
      expect(res.stdout).to.contain('NumberOfActivePoints')
      expect(res.stdout).to.contain('SessionsSummaryList')
    })
  })
})
