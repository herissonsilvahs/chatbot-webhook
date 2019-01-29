module.exports = {
  async talk (req, res) {
    try {
      res.status(200).json({ message: 'hi' })
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)      
    }
  }
}