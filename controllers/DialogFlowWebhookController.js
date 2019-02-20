module.exports = {
  async start (req, res) {
    console.log(req)
    return res.status(200).json(req)
  }
}