<?php
function generate_bcrypt_hash() {
    $pwd = password_hash("UNEP@2026", PASSWORD_BCRYPT);
    echo $pwd;
}

generate_bcrypt_hash();