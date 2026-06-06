CREATE TABLE movto_contas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    conta_id BIGINT UNSIGNED NOT NULL,

    valor DECIMAL(12,2) NOT NULL,

    data_vencimento DATE NOT NULL,

    status ENUM(
        'PENDENTE',
        'PAGO',
        'CANCELADO'
    ) NOT NULL DEFAULT 'PAGO',

    ativa BOOLEAN NOT NULL DEFAULT TRUE,

    observacao TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_movimentacoes_contas
        FOREIGN KEY (conta_id)
        REFERENCES contas(id)
);

CREATE INDEX idx_movto_contas_created_at
ON movto_contas(created_at);

CREATE INDEX idx_movto_contas_data_vencimento
ON movto_contas(data_vencimento);


CREATE INDEX idx_movto_contas_status
ON movto_contas(status);


-- Consultas
SELECT
    m.id,
    c.descricao AS conta,
    c.tipo,
    m.valor,
    m.data_vencimento,
    m.status
FROM movto_contas m
INNER JOIN contas c
    ON c.id = m.conta_id;