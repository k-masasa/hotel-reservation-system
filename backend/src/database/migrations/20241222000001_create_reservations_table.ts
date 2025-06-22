import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reservations', function (table) {
    table.increments('id').primary();
    table.integer('adult_count').notNullable();
    table.integer('school_child_count').defaultTo(0);
    table.integer('preschool_child_count').defaultTo(0);
    table.string('guest_name', 100).notNullable();
    table.string('phone_number', 20).notNullable();
    table.string('email', 255).notNullable();
    table.text('address');
    table.integer('birth_year');
    table.integer('birth_month');
    table.integer('birth_day');
    table.integer('check_in_year').notNullable();
    table.integer('check_in_month').notNullable();
    table.integer('check_in_day').notNullable();
    table.integer('check_out_year').notNullable();
    table.integer('check_out_month').notNullable();
    table.integer('check_out_day').notNullable();
    table.string('room_type', 50);
    table.integer('room_id');
    table.decimal('total_price', 10, 2).defaultTo(0);
    table.boolean('is_deleted').defaultTo(false);
    table.boolean('is_cancelled').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reservations');
}