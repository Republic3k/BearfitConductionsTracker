-- Sample Data for Session Tracking System
-- Insert coaches
INSERT INTO coaches (name, password_hash, branch) VALUES
('Coach Jaoquin', 'hashed_password_jaoquin123', 'Malingap'),
('Coach Amiel', 'hashed_password_amiel123', 'Malingap'),
('Coach Hunejin', 'hashed_password_hunejin123', 'Erod'),
('Coach Andrei', 'hashed_password_andrei123', 'Erod'),
('Coach Isaac', 'hashed_password_isaac123', 'Cainta')
ON CONFLICT (name) DO NOTHING;

-- Get coach IDs (adjust these based on actual inserted IDs)
-- Coach Jaoquin Clients - Staggered 24
INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Paola', 'QR_001', 'Staggered 24', 0, 24, id, 'Malingap', 'DONE', false FROM coaches WHERE name = 'Coach Jaoquin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Gabe', 'QR_002', 'Staggered 24', 9, 24, id, 'Malingap', '3rd payment DUE', false FROM coaches WHERE name = 'Coach Jaoquin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Alvaro', 'QR_003', 'Staggered 24', 24, 24, id, 'Malingap', '1st payment paid', false FROM coaches WHERE name = 'Coach Jaoquin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Bo', 'QR_004', 'Staggered 24', 11, 24, id, 'Malingap', '3rd payment paid', false FROM coaches WHERE name = 'Coach Jaoquin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Data', 'QR_005', 'Staggered 24', 18, 24, id, 'Malingap', '2nd Payment DUE', false FROM coaches WHERE name = 'Coach Jaoquin' ON CONFLICT (qr_code) DO NOTHING;

-- Coach Hunejin Clients - Staggered 24
INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Jensine', 'QR_037', 'Staggered 24', 42, 24, id, 'Erod', 'Renewed 48 Feb 17 +2 free', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Pat', 'QR_038', 'Staggered 24', 2, 24, id, 'Erod', 'busy', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Dulce', 'QR_039', 'Staggered 24', 21, 24, id, 'Erod', '24 partial renewed Feb 18', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Bea', 'QR_040', 'Staggered 24', 17, 24, id, 'Erod', '7 sessions left', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Steph', 'QR_041', 'Staggered 24', 8, 24, id, 'Erod', '5 free sessions', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Dianne', 'QR_042', 'Staggered 24', 3, 24, id, 'Erod', '3 left +2 free', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Bel', 'QR_043', 'Staggered 24', 0, 24, id, 'Erod', 'Done', true FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Julie', 'QR_044', 'Staggered 24', 0, 24, id, 'Erod', 'Done, will renew', true FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

-- Coach Hunejin Clients - Full 24
INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Doc Sherwin', 'QR_045', 'Full 24', 29, 24, id, 'Erod', '+21 from Doc Cheche', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Gloria Ocampo', 'QR_046', 'Full 24', 17, 24, id, 'Erod', '2nd payment 2/21', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Victor Domingo', 'QR_047', 'Full 24', 11, 24, id, 'Erod', '+2 free', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Lexi Bartolome', 'QR_048', 'Full 24', 15, 24, id, 'Erod', 'Full 24', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Starsky', 'QR_049', 'Full 24', 6, 24, id, 'Erod', '+5 free', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;

INSERT INTO clients (name, qr_code, package_type, remaining_balance, starting_balance, coach_id, branch, payment_status, is_inactive)
SELECT 'Christine', 'QR_050', 'Staggered 24', 22, 24, id, 'Erod', '24 stag, 2/25 first payment', false FROM coaches WHERE name = 'Coach Hunejin' ON CONFLICT (qr_code) DO NOTHING;
