module.exports = {
  api: {
    input: "https://test.vmarmysh.com/api.swagger.user.get",
    output: {
      target: "./src/api/generated.ts",
      client: "axios",
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
