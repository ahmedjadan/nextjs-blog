export default function handler(req, res) {
  res.json({
    name: "ahmed",
    age: 31,
    hoppies: [
      {first: "first", second: "second"}, {name: "anas"}
    ]
  
  })
}