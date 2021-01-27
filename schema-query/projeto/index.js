const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Usuario{
        id: ID!
        name: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto{
        name: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    #Points Input Api
    type Query{
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
    }
`

const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        } 
    },

    Produto:{
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco * (1 - produto.desconto)
            }else{
                return produto.preco
            }
        }
    },
    Query :{
        ola(){
            return 'Bom dia'
        },
        horaCerta(){
            return new Date
        },
        usuarioLogado(){
            return{
                id: 1,
                name: 'Maria',
                idade: 23,
                salario_real: 1.250,
                email: 'teste@teste.com',
                vip: true                
            }
        },
        produtoEmDestaque(){
            return {
                name: 'Produto de teste',
                preco: 152.00,
                desconto: 0.50
            }
        },
        numerosMegaSena(){
            return [4,8,123,25,33,53]
        }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Execultando em ${url}`)
})