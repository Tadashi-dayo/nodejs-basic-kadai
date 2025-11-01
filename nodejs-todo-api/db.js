// ●接続プールの作成
// promiseを使う場合
const mysql = require('mysql2/promise');

//DBの接続設定
const dbConfig = {
  host: 'localhost', // MySQLサーバーのホスト名(通常は'localhost')
  port: 3306, // 使用するポート番号
  user: 'root', // MySQLのユーザー名(初期設定は'root')
  password: '', // MySQLのパスワード(XAMPPの初期設定は'')
  database: 'nodejs_db_kadai' // 使用するデータベース名
};

// DB接続プールを作成
const pool = mysql.createPool(dbConfig);

// ●接続プールの破棄
async function closePool() {
  try {
    await pool.end();
    console.log('データベース接続プールを破棄しました。');
  } catch (err) {
    console.error('データベース接続プールの破棄中にエラーが発生しました：', err);
  }
}

//SQL文の実行
async function executeQuery(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error(err);
    throw err; // エラーを呼び出し元に投げる
  }
}

// モジュールとしてエクスポート
module.exports = {
  closePool,
  executeQuery
};