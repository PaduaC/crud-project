const Crud = artifacts.require("Crud");

contract("Crud", () => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });

  it("should create new user", async () => {
    await crud.create("Dange");
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === "Dange");
  });

  it("should update the user's info", async () => {
    await crud.update(1, "Andy");
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === "Andy");
  });

  it("should NOT update non-existing user", async () => {
    try {
      await crud.update(2, "beans's beans");
    } catch (err) {
      assert(err.message.includes("whoops... This user does not exist"));
      return;
    }
    assert(false);
  });

  it("should destroy a user", async () => {
    await crud.destroy(1);
    try {
      await crud.read(1);
    } catch (err) {
      assert(err.message.includes("whoops... This user does not exist"));
      return;
    }
    assert(false);
  });

  it("should NOT destroy a non-existant user", async () => {
    try {
      await crud.destroy(3);
    } catch (err) {
      assert(err.message.includes("whoops... This user does not exist"));
      return;
    }
    assert(false);
  });
});
