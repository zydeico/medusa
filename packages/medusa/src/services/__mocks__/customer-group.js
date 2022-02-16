export const CustomerGroupServiceMock = {
  withTransaction: function () {
    return this
  },

  create: jest.fn().mockImplementation((f) => {
    return Promise.resolve(f)
  }),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 21d99a44 (feat: GET customer group endpoint)

  retrieve: jest.fn().mockImplementation((f) => {
    return Promise.resolve(f)
  }),
<<<<<<< HEAD
=======
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
=======
>>>>>>> 21d99a44 (feat: GET customer group endpoint)
}

const mock = jest.fn().mockImplementation(() => {
  return CustomerGroupServiceMock
})

export default mock
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
=======

>>>>>>> 21d99a44 (feat: GET customer group endpoint)
