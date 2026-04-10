<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddPasswordResetFieldsToUsers extends Migration
{
    public function up()
    {
        if (!$this->db->fieldExists('reset_token', 'users')) {
            $this->forge->addColumn('users', [
                'reset_token' => [
                    'type'       => 'VARCHAR',
                    'constraint' => 255,
                    'null'       => true,
                    'after'      => 'token',
                ],
            ]);
        }

        if (!$this->db->fieldExists('reset_token_expires_at', 'users')) {
            $this->forge->addColumn('users', [
                'reset_token_expires_at' => [
                    'type' => 'DATETIME',
                    'null' => true,
                    'after' => 'reset_token',
                ],
            ]);
        }
    }

    public function down()
    {
        if ($this->db->fieldExists('reset_token_expires_at', 'users')) {
            $this->forge->dropColumn('users', 'reset_token_expires_at');
        }

        if ($this->db->fieldExists('reset_token', 'users')) {
            $this->forge->dropColumn('users', 'reset_token');
        }
    }
}

