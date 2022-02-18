export const CustomerGroupServiceMock = {
  withTransaction: function () {
    return this
  },

  create: jest.fn().mockImplementation((f) => {
    return Promise.resolve(f)
  }),
<<<<<<< HEAD

  retrieve: jest.fn().mockImplementation((f) => {
    return Promise.resolve(f)
  }),
=======
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
}

const mock = jest.fn().mockImplementation(() => {
  return CustomerGroupServiceMock
})

export default mock
<<<<<<< HEAD

=======
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
