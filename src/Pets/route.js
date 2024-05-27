import express from "express";
import { Pet } from "../models/Pet.js";
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("CHEGOU AQUI");
  const { id } = req.query;

  let users = null;

  if (id) {
    users = await Pet.findOne({ where: { id: id } });
  } else {
    users = await Pet.findAll({});
  }

  console.log("USERS", users);

  return res.status(200).send(users);
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).send({ erro: "Dados faltantes" });

  try {
    const users = await Pet.destroy({
      where: {
        id: id,
      },
    });

    console.log("USERS", users);

    if (users) return res.status(200).send({ status: "ok" });

    res.status(500).send({ erro: "Nao foi possivel criar a Pet" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send({ erro: "Nao foi possivel criar a Pet" });
  }
});

router.post("/", async (req, res) => {
  const { name, age, porte, entryDate, characteristics, photo } = req.body;

  if (!name || !age || !porte || !entryDate || !characteristics || !photo)
    return res.status(400).send({ erro: "Dados faltantes" });

  try {
    const user = await Pet.create({
      name: name,
      age: age,
      porte: porte,
      entryDate: entryDate,
      characteristics: characteristics,
      photo: photo,
    });

    if (user) return res.status(201).send({ user, status: "ok" });

    res.status(500).send({ erro: "Nao foi possivel criar a Pet" });
  } catch (error) {
    // handle error so it doesn`t break
    console.log("ERROR", error);
    res
      .status(500)
      .send({ erro: "Nao foi possivel criar a Pet", error: error });
  }
});

router.patch("/adopt", async (req, res) => {
  const { wantToAdopt, id } = req.body;
  console.log("REQBOD", req.body);

  if (!wantToAdopt || !id)
    return res.status(400).send({ erro: "Dados faltantes" });

  try {
    const existingPet = await Pet.findOne({
      where: { id: id },
    });

    console.log("EXIST", existingPet);

    if (!existingPet) {
      return res.status(404).send({ erro: "ID Não encontrado" });
    }

    let dataToInsert = [];

    if (existingPet.dataValues.wantToAdopt) {
      dataToInsert = [...existingPet.dataValues.wantToAdopt];
    }

    dataToInsert.push(wantToAdopt);

    const user = await Pet.update(
      {
        wantToAdopt: dataToInsert,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (user[0] === 0) return res.status(404).send({ status: "not found" });

    if (user) return res.status(201).send({ user, status: "ok" });

    res.status(500).send({ erro: "Nao foi possivel editar o Pet" });
  } catch (error) {
    // handle error so it doesn`t break
    console.log("ERROR", error);
    res.status(500).send({ erro: "Nao foi possivel criar o Pet" });
  }
});

router.put("/", async (req, res) => {
  const { id, name, age, porte, entryDate, characteristics, photo } = req.body;

  if (
    !id ||
    !name ||
    !age ||
    !porte ||
    !entryDate ||
    !characteristics ||
    !photo
  )
    return res.status(400).send({ erro: "Dados faltantes" });

  try {
    const user = await Pet.update(
      {
        name: name,
        age: age,
        porte: porte,
        entryDate: entryDate,
        characteristics: characteristics,
        photo: photo,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (user[0] === 0) return res.status(404).send({ status: "not found" });

    if (user) return res.status(201).send({ user, status: "ok" });

    res.status(500).send({ erro: "Nao foi possivel criar a Pet" });
  } catch (error) {
    // handle error so it doesn`t break
    console.log("ERROR", error);
    res.status(500).send({ erro: "Nao foi possivel criar a Pet" });
  }
});

export default router;
